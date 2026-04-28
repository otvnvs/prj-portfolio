JS_FILES := $(shell find . -name "*.js" -not -path "*/node_modules/*" -not -path "*/bak/*")
HTML_FILES:= $(shell find . -name "*.html" -not -path "*/node_modules/*" -not -path "*/bak/*")
CSS_FILES:= $(shell find . -name "*.css" -not -path "*/node_modules/*" -not -path "*/bak/*")
PRETTIER_CONFIG := ./.prettierrc
PORT := 5555
TIMESTAMP := $(shell date +"%Y%m%d_%H%M%S_%3N")
BACKUP_DIR := ./bak/$(TIMESTAMP)
FAVICON=./favicon.ico
default: gradient favicon prettify
.PHONY: prettify serve backup favicon $(GRADIENT) $(FAVICON)
prettify:
	@for file in $(JS_FILES) $(HTML_FILES) $(CSS_FILES); do \
		prettier --config $(PRETTIER_CONFIG) --write "$$file"; \
	done
serve: $(FAVICON) $(GRADIENT)
	@darkhttpd ./ --port $(PORT)
backup:
	@mkdir -p $(BACKUP_DIR)
	@cp .prettierrc $(BACKUP_DIR)/
	@cp Makefile $(BACKUP_DIR)/
	@cp package.json $(BACKUP_DIR)/
	@cp server-node.js $(BACKUP_DIR)/
	@cp -r www $(BACKUP_DIR)/
	@echo "Backup completed to $(BACKUP_DIR)"
favicon:
	@COLOR=$$(python3 -c "import random; print(f'#%06x' % random.randint(0, 0xFFFFFF))"); \
	convert -size 256x256 xc:none -fill "$$COLOR" -draw "circle 128,128 128,10" $(FAVICON); \
	echo "Favicon created with color"
