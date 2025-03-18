import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/Button';

export default function Reservations() {
  return (
    <PageWrapper className="max-w-4xl">
      <h1 className="section-title">Reservations</h1>
      
      <p className="mb-8 text-gray-300">
        Make a reservation to secure your spot at Speakeasy. For parties larger than 8, please contact us directly.
      </p>
      
      <div className="bg-gray-900/50 p-6 border border-gray-800 mb-12">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label htmlFor="phone" className="block mb-2 text-sm">Phone</label>
              <input
                type="tel"
                id="phone"
                className="w-full p-3 bg-gray-900 border border-gray-700 text-white focus:border-amber-700 focus:outline-none"
                placeholder="Your Phone"
              />
            </div>
            
            <div>
              <label htmlFor="guests" className="block mb-2 text-sm">Number of Guests</label>
              <select
                id="guests"
                className="w-full p-3 bg-gray-900 border border-gray-700 text-white focus:border-amber-700 focus:outline-none"
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
                <option value="6">6 People</option>
                <option value="7">7 People</option>
                <option value="8">8 People</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="date" className="block mb-2 text-sm">Date</label>
              <input
                type="date"
                id="date"
                className="w-full p-3 bg-gray-900 border border-gray-700 text-white focus:border-amber-700 focus:outline-none"
              />
            </div>
            
            <div>
              <label htmlFor="time" className="block mb-2 text-sm">Time</label>
              <select
                id="time"
                className="w-full p-3 bg-gray-900 border border-gray-700 text-white focus:border-amber-700 focus:outline-none"
              >
                <option value="17:00">5:00 PM</option>
                <option value="17:30">5:30 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="18:30">6:30 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="19:30">7:30 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="20:30">8:30 PM</option>
                <option value="21:00">9:00 PM</option>
                <option value="21:30">9:30 PM</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="special-requests" className="block mb-2 text-sm">Special Requests</label>
            <textarea
              id="special-requests"
              rows={3}
              className="w-full p-3 bg-gray-900 border border-gray-700 text-white focus:border-amber-700 focus:outline-none"
              placeholder="Any special requests or dietary restrictions?"
            ></textarea>
          </div>
          
          <Button variant="primary" fullWidth>Book Table</Button>
        </form>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-serif mb-4">Reservation Policy</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• Reservations can be made up to 30 days in advance</li>
          <li>• For parties larger than 8, please call us directly</li>
          <li>• A credit card is required to secure your reservation</li>
          <li>• Cancellations must be made at least 24 hours in advance</li>
          <li>• Late arrivals will be held for 15 minutes past the reservation time</li>
        </ul>
      </div>
    </PageWrapper>
  );
}