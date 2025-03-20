import { PageWrapper } from '@/components/layout/PageWrapper';
import { RESTAURANT_ADDRESS, RESTAURANT_PHONE, RESTAURANT_EMAIL, BUSINESS_HOURS } from '@/config';

export default function Contact() {
  return (
    <PageWrapper className="">
      <h1 className="section-title text-center mb-12">Contact Us</h1>
      
      <div className="bg-opacity-20 backdrop-blur-sm rounded-lg p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif mb-4 text-amber-400">Address</h2>
              <p className="text-gray-200 text-lg">{RESTAURANT_ADDRESS}</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-serif mb-4 text-amber-400">Contact</h2>
              <div className="space-y-2">
                <p className="text-gray-200 text-lg">
                  <span className="inline-block w-16">Phone:</span> 
                  <a href={`tel:${RESTAURANT_PHONE}`} className="hover:text-amber-400 transition-colors">
                    {RESTAURANT_PHONE}
                  </a>
                </p>
                <p className="text-gray-200 text-lg">
                  <span className="inline-block w-16">Email:</span>
                  <a href={`mailto:${RESTAURANT_EMAIL}`} className="hover:text-amber-400 transition-colors">
                    {RESTAURANT_EMAIL}
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-serif mb-4 text-amber-400">Hours</h2>
            
            <div className="bg-opacity-30 rounded-lg p-6 border border-amber-900/30">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2 text-amber-300">Weekdays</h3>
                <p className="text-gray-200">{BUSINESS_HOURS.weekday}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2 text-amber-300">Weekends</h3>
                <p className="text-gray-200">{BUSINESS_HOURS.weekend}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 text-amber-300">Sunday</h3>
                <p className="text-gray-200">{BUSINESS_HOURS.sundayMonday}</p>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-amber-200 italic">
                For reservations, please call during business hours
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-amber-900/30 text-center">
          <p className="text-gray-300">
            We look forward to serving you and providing an unforgettable dining experience.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}