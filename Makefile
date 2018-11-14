dependencies:
	yarn

build: dependencies
	yarn build

generate:
	rm -rf dist
	mkdir -p dist/fonts dist/style dist/icons dist/export
	echo "Start dumping to dist"
	./bin/react.py config.json > dist/icons/particles-react-native.json
	./bin/dump.py config.json > dist/icons/particles.json
	echo "Finished dumping to dist"
	echo "Start replacing"
	./bin/replace.py config.json stroke-linecap=\"round\" stroke-linecap=\"butt\"
	./bin/replace.py config.json stroke-linejoin=\"round\" stroke-linejoin=\"miter\"
	echo "Finished replacing"
	echo "Start generate fonts"
	fontforge -script ./bin/generate.py config.json dist/icons/particles.json
	echo "Finished generate fonts"
	woff2_compress dist/fonts/particles.ttf
	./bin/create_css.py config.json > dist/style/particles.css
	./bin/create_scss.py config.json > dist/style/particles.scss
	./bin/create_data.py config.json > dist/icons/particles-data.json

github-pages: dependencies
	git config --global user.email "bot@presslabs.com"
	git config --global user.name "Igor Debot"
	for i in $(ls | egrep -v "docs|fonts"); do rm -rf $i; done
	cp -R docs/* .
	rm -rf docs
	git add .
	git add -f fonts/
	echo -n "(autodoc) " > /tmp/COMMIT_MESSAGE ; git log -1 --pretty=%B >> /tmp/COMMIT_MESSAGE ; echo >> /tmp/COMMIT_MESSAGE ; echo "Commited-By: $$CI_BUILD_URL" >> /tmp/COMMIT_MESSAGE
	git commit -F /tmp/COMMIT_MESSAGE
