import { PageWrapper } from '@/components/layout/PageWrapper';
import { SeamlessPDFViewer } from '@/components/ui/SeamlessPDFViewer';

export default function Drinks() {
  return (
    <PageWrapper>
    <div className="w-full overflow-x-hidden bg-black">
      <SeamlessPDFViewer 
        pdfUrl="/menus/yes-apothecary-drinks.pdf" 
        title={"Care for a drink?"}
      />
    </div>
    </PageWrapper>
  );
}