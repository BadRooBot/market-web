// components/InformationForm.js
import { useState,useEffect } from 'react';


export default function InformationForm({ nextStep, updateFormData,data }) {
    const [name, setName] = useState(data.name);
    const [email, setEmail] = useState(data.email);
    const [email_me, setEmail_me] = useState(data.email_me);
    const [country, setCountry] = useState(data.country);
    const [address, setAddress] = useState(data.address);
    const [phone, setPhone] = useState(data.phone);
    const [city, setCity] = useState(data.city);
    const [state, setState] = useState(data.state);
    useEffect(() => {
      setName(data.name);
      setEmail(data.email);
      setEmail_me(data.email_me);
      setCountry(data.country);
      setAddress(data.address);
      setPhone(data.phone);
      setCity(data.city);
      setState(data.state);
    }, [data]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      updateFormData({ name, email,address, city
        ,phone ,email_me,country,phone,state });

      nextStep();
    };
    const changreEmail_me=(val)=>{
      console.log('val =========',val)
      val=='on'?'':'on'
      setEmail_me(val)
    }
  
    return (
      <form onSubmit={handleSubmit} className='border-black bg-neutral-300  dark:border-gray-500  dark:bg-black   dark:text-white text-black p-6 rounded-xl shadow-lg shadow-neutral-700' >
           <div className="mb-4 dark:text-white text-black  ">
              <input
               type="email"
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
                className="w-full p-2 border rounded  bg-neutral-300  border-black dark:border-gray-500  dark:bg-black   dark:text-white text-black"
              />
            </div>
            
            <div className="mb-4">
              <label className="flex items-center ">
                <input id="email_me"
                  placeholder="email_me"
                  checked={email_me}
                  onChange={(e) => changreEmail_me(e.target.checked)}
                  name="email_me" type="checkbox" className="mr-2" />
                <span>Email me with news and offers</span>
              </label>
            </div>
            
            <h2 className="text-xl font-bold mb-4">Shipping address</h2>
            
            <div className="mb-4">
              <select
              required
              id="country"
                    name="country"
                    
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-2 border rounded  bg-neutral-300  border-black dark:border-gray-500  dark:bg-black   dark:text-white text-black"
                
              >
                <option value="EGP">Egypt </option>
              </select>
            </div>
            
            <div className="flex mb-4">
              <input
              required
                type="text"
                id="First_name"
                    name="First_name"
                    value={name}
               onChange={(e) => setName(e.target.value)}
               className="w-1/2 mr-2 p-2 border rounded  bg-neutral-300  border-black dark:border-gray-500  dark:bg-black   dark:text-white text-black"

                placeholder="Full name "
              />
             
            </div>
            
            <div className="mb-4 relative">
              <input
              required
                type="text"
                id="Address"
                    name="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full mr-2 p-2 border rounded  bg-neutral-300  border-black dark:border-gray-500  dark:bg-black   dark:text-white text-black"
                    placeholder="Address"
              />
              {/* <Search className="absolute right-3 top-3 text-gray-400" /> */}
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-400">Add a house number if you have one</p>
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                required
                id="phone_number"
                    name="phone_number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mr-2 p-2 border rounded  bg-neutral-300  border-black dark:border-gray-500  dark:bg-black   dark:text-white text-black"
                placeholder="phone number"
              />
            </div>
            
            <div className="flex mb-4">
              <input
                type="text"
                id="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                    name="City"
                    className="w-1/3 mr-2 p-2 border rounded  bg-neutral-300  border-black dark:border-gray-500  dark:bg-black   dark:text-white text-black"
                placeholder="City"
              />
              <div className="w-1/3 mx-2 relative">
              <input
                type="text"
                id="states"
                    name="states"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-1/3 mr-2 p-2 border rounded  bg-neutral-300  border-black dark:border-gray-500  dark:bg-black   dark:text-white text-black"
                placeholder="Area"
              />
              </div>
             
            </div>
            <button className='inline-flex justify-center rounded-md border border-indigo-500   dark:bg-neutral-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'  type="submit">Next</button>

      </form>
    );
  }
