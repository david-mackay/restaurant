import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/Button';
import { RESTAURANT_ADDRESS, RESTAURANT_PHONE, RESTAURANT_EMAIL, BUSINESS_HOURS } from '@/config';

export default function Contact() {
  return (
    <PageWrapper className="max-w-4xl">
      <h1 className="section-title">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-serif mb-4">Get in Touch</h2>
          <p className="text-gray-300 mb-6">
            For reservations, private events, or any inquiries, please fill out the form or use the contact information below.
          </p>
          
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="text-lg font-medium mb-1">Address</h3>
              <p className="text-gray-400">{RESTAURANT_ADDRESS}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-1">Hours</h3>
              <p className="text-gray-400">{BUSINESS_HOURS.weekday}</p>
              <p className="text-gray-400">{BUSINESS_HOURS.weekend}</p>
              <p className="text-gray-400">{BUSINESS_HOURS.sundayMonday}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-1">Contact</h3>
              <p className="text-gray-400">Phone: {RESTAURANT_PHONE}</p>
              <p className="text-gray-400">Email: {RESTAURANT_EMAIL}</p>
            </div>
          </div>
        </div>
        
        <div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 bg-gray-900 border border-gray-700 text-white focus:border-amber-700 focus:outline-none"
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 bg-gray-900 border border-gray-700 text-white focus:border-amber-700 focus:outline-none"
                placeholder="Your Email"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full p-3 bg-gray-900 border border-gray-700 text-white focus:border-amber-700 focus:outline-none"
                placeholder="Subject"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2 text-sm">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-3 bg-gray-900 border border-gray-700 text-white focus:border-amber-700 focus:outline-none"
                placeholder="Your Message"
              ></textarea>
            </div>
            
            <Button variant="primary" fullWidth>Send Message</Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}