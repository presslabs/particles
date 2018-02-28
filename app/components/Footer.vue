<template>
  <footer class="footer">
    <div class="cols">
      <div class="col">
        <a href="https://www.presslabs.com/" class="logo"><particle>presslabs</particle></a>
      </div>
      <div class="col">
        <p class="copyright">© 2017-2018 Presslabs.</p>
        <p class="trademark">Presslabs® is a registered trademark in the USA by Presslabs SRL, based in the European Union under number RO28378350.</p>
        <p class="presslabs"><particle>eu_flag_dark</particle>Engineered in Europe, deployed worldwide.</p>
      </div>
      <div class="col">
        <h6>PRESSLABS</h6>
        <ul class="footer-nav">
          <li><a href="https://www.presslabs.com/">WordPress Hosting</a></li>
          <li><a href="https://www.presslabs.com/about">About Presslabs</a></li>
        </ul>
      </div>
      <div class="col">
        <h6>OPEN SOURCE</h6>
        <ul class="footer-nav">
          <li><a href="https://www.presslabs.org/gitfs">gitfs</a></li>
          <li><a href="https://www.presslabs.org/gitium">gitium</a></li>
          <li><a href="https://www.presslabs.org/silver">silver</a></li>
          <li><a href="https://www.presslabs.org/toplytics">toplytics</a></li>
        </ul>
      </div>
      <div class="col">
        <h6>REACH US</h6>
        <ul class="footer-nav socials">
          <li><a href="https://www.facebook.com/presslabs/"><particle>facebook</particle></a></li>
          <li><a href="https://twitter.com/presslabs/"><particle>twitter</particle></a></li>
          <li><a href="https://github.com/presslabs"><particle>github</particle></a></li>
          <li><a href="https://www.linkedin.com/company-beta/2188682/"><particle>linkedin</particle></a></li>
          <li><a href="http://profiles.wordpress.org/presslabs/"><particle>wordpress</particle></a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import Particle from './Particle'

export default {
  components: { Particle }
}
</script>

<style lang="scss">
@import "./variables";
@import "./colors";

.footer {
  text-align: left;
  margin-top: 40px;
  font-size: 14px;
  padding: 100px 40px;
  @media screen and (min-width: 768px) {
    padding: 100px;
  }
  .cols {
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 768px) {
      flex-direction: row;
    }
    .col {
      flex: 1;
      margin-right: 40px;
    }
  }
  .footer-nav {
    list-style: none;
    margin: 0 0 24px 0;
    padding: 0;
    a {
      text-decoration: none;
      color: $gray-3;
      &:hover {
        color: $secondColor;
        text-decoration: underline;
      }
    }
    &.socials {
      display: flex;
      li {
        flex: 1;
        i {
          font-size: 24px;
        }
      }
      a:hover {
        text-decoration: none;
      }
    }
  }
  h6 {
    font-size: 12px;
    letter-spacing: 1.4px;
  }
  h6, p {
    margin-top: 0;
    line-height: 24px;
    margin-bottom: 24px;
  }
  li {
    line-height: 24px;
  }
  p.presslabs {
    margin-left: 30px;
    text-indent: -15px;
    i {
      font-size: 20px;
      margin-right: 10px;
      color: $purple-1;
      vertical-align: middle;
    }
  }
  .logo {
    text-decoration: none;
    margin-bottom: 30px;
    display: block;
    i {
      display: block;
      color: $green-1;
      font-size: 48px;
    }
  }
}
</style>
