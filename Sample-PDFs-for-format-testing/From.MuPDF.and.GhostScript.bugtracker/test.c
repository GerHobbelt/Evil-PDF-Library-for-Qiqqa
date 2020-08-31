#include <mupdf/fitz.h>

#define MAX_STORE_SIZE (4 << 20)

int main(int argc, char **argv)
{
	fz_context *ctx = fz_new_context(NULL, NULL, MAX_STORE_SIZE);
	fz_register_document_handlers(ctx);
	fz_document *doc = fz_open_document(ctx, argv[1]);
	fz_matrix tm = fz_scale(2.0, 2.0);
	int pages_count = fz_count_pages(ctx, doc);

	for (int i = 0; i < pages_count; i++) {
		printf("Loading page %i.\n", i + 1);
		fz_pixmap *pixmap = fz_new_pixmap_from_page_number(ctx, doc, i, tm, fz_device_gray(ctx), 0);
		fz_drop_pixmap(ctx, pixmap);
	}

	fz_debug_store(ctx);
	fz_drop_document(ctx, doc);
	fz_drop_context(ctx);
	return EXIT_SUCCESS;
}
