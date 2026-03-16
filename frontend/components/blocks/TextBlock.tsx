import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import type { TextBlock as TextBlockType } from "@/type";

export { RichTextRenderer };

export function TextBlock({ content }: TextBlockType) {
	if (!content?.length) return null;
	return (
		<section className="mx-auto w-full max-w-7xl px-8 py-12">
			<div className="prose dark:prose-invert max-w-none">
				<RichTextRenderer nodes={content} />
			</div>
		</section>
	);
}
