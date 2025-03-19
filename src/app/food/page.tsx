import { PageWrapper } from '@/components/layout/PageWrapper';
import { SeamlessPDFViewer } from '@/components/ui/SeamlessPDFViewer';
import { RESTAURANT_NAME } from '@/config';

export default function Drinks() {
  return (
    <PageWrapper>
    <div className="w-full overflow-x-hidden bg-black">
      <SeamlessPDFViewer 
        pdfUrl="/menus/yes-apothecary-food.pdf" 
        title={`${RESTAURANT_NAME} Food`}
      />
    </div>
    </PageWrapper>
  );
}