import { Link } from 'react-scroll';
import cn from '@/ui/utils/class-names';
import SimpleBar from '@/ui/ui/simplebar';

export const formParts = {
  summary: 'summary',
  media: 'media',
  pricingInventory: 'pricingInventory',
  productIdentifiers: 'productIdentifiers',
  shipping: 'shipping',
  seo: 'seo',
  deliveryEvent: 'deliveryEvent',
  variantOptions: 'variantOptions',
  tagsAndCategory: 'tagsAndCategory',
};

export const menuItems = [
  {
    label: 'סיכום',
    value: formParts.summary,
  },
  {
    label: 'תמונות וגלריה',
    value: formParts.media,
  },
  {
    label: 'מחירים ומלאי',
    value: formParts.pricingInventory,
  },
  {
    label: 'מזהה מוצר',
    value: formParts.productIdentifiers,
  },
  {
    label: 'משלוחים',
    value: formParts.shipping,
  },
  {
    label: 'SEO',
    value: formParts.seo,
  },
  {
    label: 'אפשרויות מוצר',
    value: formParts.variantOptions,
  },
];

interface FormNavProps {
  className?: string;
}

export default function FormNav({ className }: FormNavProps) {
  return (
    <div
      className={cn(
        'sticky top-[68px] z-20 border-b border-gray-300 bg-white py-0 font-medium text-gray-500 @2xl:top-[72px] dark:bg-gray-50 2xl:top-20',
        className
      )}
    >
      <SimpleBar>
        <div className="inline-grid grid-flow-col gap-5 md:gap-7 lg:gap-10">
          {menuItems.map((tab, idx) => (
            <Link
              key={tab.value}
              to={tab.value}
              spy={true}
              hashSpy={true}
              smooth={true}
              offset={idx === 0 ? -250 : -150}
              duration={500}
              className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000"
              activeClass="active before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:w-full before:bg-gray-1000 font-semibold text-gray-1000"
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </SimpleBar>
    </div>
  );
}
