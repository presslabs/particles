/*
 Copyright (c) 2014-2017, Jan Bösenberg & Jürg Lehni

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

import { Path, CompoundPath, Curve, Numerical, Segment, Line } from 'paper'

const errorThreshold = 0.5
const geomEpsilon = 1e-8
const { abs } = Math
const enforeArcs = false

const offsetPath = (path, offset, dontMerge) => {
  const result = new Path({ insert: false })
  const curves = path.getCurves()
  const strokeJoin = path.getStrokeJoin()
  const miterLimit = path.getMiterLimit()
  for (let i = 0, l = curves.length; i < l; i += 1) {
    const curve = curves[i]
    if (curve.hasLength(geomEpsilon)) {
      const segments = getOffsetSegments(curve, offset)
      if (!result.isEmpty()) {
        connect(
          result,
          segments.shift(),
          curve.segment1,
          offset,
          strokeJoin,
          miterLimit,
          true,
        )
      }
      result.addSegments(segments)
    }
  }
  if (path.isClosed() && !result.isEmpty()) {
    connect(
      result,
      result.firstSegment,
      path.firstSegment,
      offset,
      strokeJoin,
      miterLimit,
    )
    if (dontMerge) {
      result.setClosed(true)
    } else {
      result.closePath()
    }
  }
  return result
}

const connect = (
  path,
  dest,
  originSegment,
  offset,
  type,
  miterLimit,
  addLine,
) => {
  const fixHandles = seg => {
    const { handleIn, handleOut } = seg
    if (handleIn.length < handleOut.length) {
      seg.handleIn = handleIn.project(handleOut)
    } else {
      seg.handleOut = handleOut.project(handleIn)
    }
  }

  const center = originSegment.point
  const start = path.lastSegment
  const pt1 = start.point
  const pt2 = dest.point
  let connected = false

  if (!pt1.isClose(pt2, geomEpsilon)) {
    // decide if the join is inside or outside the stroke
    // by checking on which side of the line connecting pt1
    // and pt2 the center lies.
    if (
      enforeArcs ||
      new Line(pt1, pt2).getSignedDistance(center) * offset <= geomEpsilon
    ) {
      // Calculate the through point based on the vectors from center
      // to pt1 / pt2
      const radius = abs(offset)
      const v1 = pt1.subtract(center)
      const v2 = pt2.subtract(center)
      const v = v1.add(v2)
      const through =
        v.getLength() < geomEpsilon
          ? v2.rotate(90).add(center)
          : center.add(v.normalize(radius))
      path.arcTo(through, pt2)
      connected = true
    } else if (addLine) {
      path.lineTo(pt2)
      connected = true
    }
    if (connected) {
      fixHandles(start)
      const last = path.lastSegment
      fixHandles(last)
      // Adjust handleOut, except for when connecting back to the
      // beginning on closed paths.
      if (dest !== path.firstSegment) {
        last.handleOut = dest.handleOut
      }
    }
  } else if (dest !== path.firstSegment) {
    path.lastSegment.handleOut = dest.handleOut
  }
  return connected
}

export const joinOffsets = (outerPath, innerPath, originPath, offset) => {
  // outerPath.closed = false
  // innerPath.closed = true
  const path = outerPath
  const open = !originPath.closed
  const { strokeCap } = originPath
  path.reverse()
  if (open) {
    connect(
      path,
      innerPath.firstSegment,
      originPath.firstSegment,
      offset,
      strokeCap,
    )
    path.join(innerPath)
    connect(path, path.firstSegment, originPath.lastSegment, offset, strokeCap)
    path.closePath()
    return path
  }
  return new CompoundPath(outerPath, innerPath)
}

export const cleanupPath = path => {
  path.children.forEach(child => {
    if (abs(child.area) < errorThreshold) {
      child.remove()
    }
  })
}

/**
 * Creates an offset for the specified curve and returns the segments of
 * that offset path.
 *
 * @param {Curve} curve the curve to be offset
 * @param {Number} offset the offset distance
 * @returns {Segment[]} an array of segments describing the offset path
 */
const getOffsetSegments = (curve, offset) => {
  if (curve.isStraight()) {
    const n = curve.getNormalAtTime(0.5).multiply(offset)
    const p1 = curve.point1.add(n)
    const p2 = curve.point2.add(n)

    return [new Segment(p1), new Segment(p2)]
  }
  const curves = splitCurveForOffseting(curve)
  const segments = []
  for (let i = 0, l = curves.length; i < l; i += 1) {
    const offsetCurves = getOffsetCurves(curves[i], offset, 0)
    let prevSegment = null
    for (let j = 0, m = offsetCurves.length; j < m; j += 1) {
      const curve = offsetCurves[j]
      const segment = curve.segment1
      if (prevSegment) {
        prevSegment.handleOut = segment.handleOut.project(prevSegment.handleIn)
      } else {
        segments.push(segment)
      }
      segments.push((prevSegment = curve.segment2))
    }
  }
  return segments
}

const getOffsetCurves = (curve, offset) => {
  const radius = abs(offset)

  const getOffsetPoint = (v, t) =>
    Curve.getPoint(v, t).add(Curve.getNormal(v, t).multiply(offset))

  /**
   * Approach for Curve Offsetting based on:
   *   "A New Shape Control and Classification for Cubic Bézier Curves"
   *   Shi-Nine Yang and Ming-Liang Huang
   */
  const offsetAndSubdivide = (curve, curves) => {
    const v = curve.getValues()
    const ps = [getOffsetPoint(v, 0), getOffsetPoint(v, 1)]
    const ts = [Curve.getTangent(v, 0), Curve.getTangent(v, 1)]
    const pt = getOffsetPoint(v, 0.5)
    const div = ts[0].cross(ts[1]) * 3 / 4
    const d = pt.add(pt).subtract(ps[0].add(ps[1]))
    const a = d.cross(ts[1]) / div
    const b = d.cross(ts[0]) / div
    const hs = [ts[0].multiply(a), ts[1].multiply(-b)]

    // If the two handles end up pointing into opposite directions,
    // reset the shorter one to avoid tiny loops at singularities,
    // and make sure the other handle does not cross the tangent.
    if ((a < 0 && b > 0) || (a > 0 && b < 0)) {
      const flip = abs(a) > abs(b)
      const i1 = flip ? 0 : 1 // index of the longer handle
      // index of the shorter handle
      const i2 = i1 ^ 1 // eslint-disable-line no-bitwise
      const p = ps[i1]
      const h = hs[i1]
      const cross = new Line(p, h, true).intersect(
        new Line(ps[i2], ts[i2], true),
        true,
      )

      // Reset the shorter handle.
      hs[i2] = null

      // See if the longer handle crosses the other tangent, and if so
      // scale it to avoid crossing and hence producing tiny loops.
      if (cross) {
        const nh = cross.subtract(p)
        const scale = nh.dot(h) / h.dot(h)
        if (scale > 0 && scale < 1) {
          hs[i1] = nh
        }
      }
    }

    // Now create the offset curve, sample the maximum error, and keep
    // subdividing if it is too large.
    const offsetCurve = new Curve(ps[0], hs[0], hs[1], ps[1])
    const error = getOffsetError(v, offsetCurve.getValues(), radius)

    // If the whole curve is shorter than the error, ignore
    // offsetting errors and stop iterating now. This simple
    // measure along with checks of a and b above fixes all
    // singularity issues.
    if (error > errorThreshold && offsetCurve.getLength() > errorThreshold) {
      const curve2 = curve.divideAtTime(getAverageTangentTime(v))
      offsetAndSubdivide(curve, curves)
      offsetAndSubdivide(curve2, curves)
    } else {
      curves.push(offsetCurve)
    }
    return curves
  }
  return offsetAndSubdivide(curve, [])
}

const getOffsetError = (cv, ov, radius) => {
  const count = 16
  let error = 0
  for (let i = 1; i < count; i += 1) {
    const t = i / count
    const p = Curve.getPoint(cv, t)
    const n = Curve.getNormal(cv, t)
    const roots = Curve.getCurveLineIntersections(ov, p.x, p.y, n.x, n.y)
    let dist = 2 * radius
    for (let j = 0, l = roots.length; j < l; j += 1) {
      const d = Curve.getPoint(ov, roots[j]).getDistance(p)
      if (d < dist) {
        dist = d
      }
    }
    const err = abs(radius - dist)
    if (err > error) {
      error = err
    }
  }
  return error
}

/**
 * Split curve into sections that can then be treated individually by an
 * offset algorithm.
 */
const splitCurveForOffseting = curve => {
  const curves = [curve.clone()] // Clone so path is not modified.
  if (curve.isStraight()) {
    return curves
  }

  const splitAtRoots = (index, roots) => {
    for (let i = 0, prevT, l = roots && roots.length; i < l; i += 1) {
      const t = roots[i]

      // Renormalize curve-time for multiple roots:
      const curve = curves[index].divideAtTime(
        i ? (t - prevT) / (1 - prevT) : t,
      )

      prevT = t
      if (curve) {
        curves.splice(++index, 0, curve) // eslint-disable-line no-plusplus
      }
    }
  }

  // Recursively splits the specified curve if the angle between the two
  // handles is too large (we use 60° as a threshold).
  const splitLargeAngles = (index, recursion) => {
    const curve = curves[index]
    const v = curve.getValues()
    const n1 = Curve.getNormal(v, 0)
    const n2 = Curve.getNormal(v, 1).negate()
    const cos = n1.dot(n2)
    // eslint-disable-next-line no-plusplus
    if (cos > -0.5 && ++recursion < 4) {
      curves.splice(index + 1, 0, curve.divideAtTime(getAverageTangentTime(v)))
      splitLargeAngles(index + 1, recursion)
      splitLargeAngles(index, recursion)
    }
  }

  // Split curves at cusps and inflection points.
  const info = curve.classify()
  const { roots } = info
  if (roots && info.type !== 'loop') {
    splitAtRoots(0, roots)
  }

  // Split sub-curves at peaks.
  const { getPeaks } = Curve
  for (let i = curves.length - 1; i >= 0; i -= 1) {
    splitAtRoots(i, getPeaks(curves[i].getValues()))
  }

  // Split sub-curves with too large angle between handles.
  for (let i = curves.length - 1; i >= 0; i -= 1) {
    splitLargeAngles(i, 0)
  }

  return curves
}

/**
 * Returns the first curve-time where the curve has its tangent in the same
 * direction as the average of the tangents at its beginning and end.
 */
const getAverageTangentTime = v => {
  const tan = Curve.getTangent(v, 0)
    .add(Curve.getTangent(v, 0.5))
    .add(Curve.getTangent(v, 1))
  const tx = tan.x
  const ty = tan.y
  const flip = abs(ty) < abs(tx)
  const s = flip ? ty / tx : tx / ty
  const ia = flip ? 1 : 0 // the abscissa index
  // the ordinate index
  const io = ia ^ 1 // eslint-disable-line no-bitwise
  const a0 = v[ia + 0]
  const o0 = v[io + 0]
  const a1 = v[ia + 2]
  const o1 = v[io + 2]
  const a2 = v[ia + 4]
  const o2 = v[io + 4]
  const a3 = v[ia + 6]
  const o3 = v[io + 6]
  const aA = -a0 + 3 * a1 - 3 * a2 + a3
  const aB = 3 * a0 - 6 * a1 + 3 * a2
  const aC = -3 * a0 + 3 * a1
  const oA = -o0 + 3 * o1 - 3 * o2 + o3
  const oB = 3 * o0 - 6 * o1 + 3 * o2
  const oC = -3 * o0 + 3 * o1
  const roots = []
  const epsilon = Numerical.CURVETIME_EPSILON
  const count = Numerical.solveQuadratic(
    3 * (aA - s * oA),
    2 * (aB - s * oB),
    aC - s * oC,
    roots,
    epsilon,
    1 - epsilon,
  )
  // Fall back to 0.5, so we always have a place to split...
  return count > 0 ? roots[0] : 0.5
}

export default offsetPath
