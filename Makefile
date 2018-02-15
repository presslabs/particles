dependencies:
	yarn

build: dependencies
	yarn convert
	yarn generate
	yarn build

github-pages: dependencies
	git config --global user.email "bot@presslabs.com"
	git config --global user.name "Igor Debot"
	cp docs/index.html .
	git add .
	echo -n "(autodoc) " > /tmp/COMMIT_MESSAGE ; git log -1 --pretty=%B >> /tmp/COMMIT_MESSAGE ; echo >> /tmp/COMMIT_MESSAGE ; echo "Commited-By: $$CI_BUILD_URL" >> /tmp/COMMIT_MESSAGE
	git commit -F /tmp/COMMIT_MESSAGE
