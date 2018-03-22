dependencies:
	yarn

build: dependencies
	yarn build

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
