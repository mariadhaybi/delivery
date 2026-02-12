import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Building2, MapPin, Smartphone, 
  BarChart3, Users, Settings, Bell, CheckCircle, ChevronDown 
} from "lucide-react";

export default function LandingPage() {
  const { user, token, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handlePrimaryAction = () => {
    if (!token || user?.role === "company") {
      navigate("/company/dashboard");
    } else {
      window.open("https://play.google.com/store", "_blank"); 
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-[Poppins]">
        Loading Loop Delivery...
      </div>
    );

  return (
    <div className="font-[Poppins] bg-white text-[#232323] scroll-smooth">
      {/* --- Navbar --- */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-sm sticky top-0 z-50">
        <div className="text-[#E05C00] font-[Poppins]  font-semibold text-xl cursor-pointer" onClick={() => navigate("/")}>
          Loop Delivery
        </div>

        <div className=" font-[Poppins] hidden md:flex gap-6 text-sm font-medium">
          <a href="#features" className="hover:text-[#E05C00] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#E05C00] transition-colors">How It Works</a>
          <a href="#platform" className="hover:text-[#E05C00] transition-colors">Platform</a>
          <a href="#faqs" className="hover:text-[#E05C00] transition-colors">FAQs</a>
        </div>

        <div>
          {!token ? (
            <button
              onClick={() => navigate("/login")}
              className=" font-[Poppins] px-6 py-2 bg-[#e45d05] text-white rounded-lg font-bold shadow-md hover:bg-[#c44e04] transition-all"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={logout}
              className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative h-[600px] flex items-center justify-center text-center text-white p-4">
        {/* خلفية الصورة مع التعديلات لتطابق صورتك */}
        <div className="absolute inset-0 z-0 bg-[#1a1a1a]"> {/* خلفية غامقة أساسية */}
          <img
            src="./images/landingpage1.jpg"
            className="w-full h-full object-cover object-top opacity-60" 
            /* object-top: بتنزل الصورة لتحت ليبين راسها */
            /* opacity-60: بتعطي نفس تأثير التعتيم اللي بالصورة */
            alt="Delivery"
          />
          {/* طبقة إضافية للتعتيم المتدرج كرمال النص يوضح أكتر */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        <div className="relative z-10 max-w-4xl px-4">
          <h1 className=" font-[Poppins] text-3xl md:text-5xl font-semibold mb-4 text-[#E05C00]">
            Delivery Management System
          </h1>
          <p className=" font-[Poppins] text-lg mb-8 opacity-90 leading-relaxed font-light text-[#FCFCFC]">
            A centralized platform to manage deliveries, drivers, and multiple
            <br className="hidden md:block" />
            branches. Streamline operations with real-time tracking and
            <br className="hidden md:block" />
            comprehensive analytics.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {(!token || user?.role === "company") && (
              <button
                onClick={handlePrimaryAction}
                className="bg-[#e45d05] px-8 py-4 rounded-lg font-bold hover:bg-[#c44e04] transition-all shadow-lg flex items-center gap-2"
              >
                + New Delivery Request
              </button>
            )}

            {(!token || user?.role === "driver") && (
              <button
                onClick={() => !token ? navigate("/login") : window.open("https://play.google.com/store", "_blank")}
                className="bg-black/20 backdrop-blur-md border border-white/30 px-8 py-4 rounded-lg font-bold hover:bg-black/40 transition-all"
              >
                {token ? "📲 Download Driver App" : "Join as a Driver"}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* --- Key Features Section --- */}
      <section id="features" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-[Poppins] text-xl md:text-4xl font-medium mb-4">Key Features</h2>
            <h3 className="text-[#5F5F5F] font-medium text-xl font-[Poppins]">Everything you need to manage deliveries efficiently and scale your operations</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-12 font-[Poppins]">
            {[
              { title: "Centralized Admin Dashboard", desc: "Single platform to manage all delivery operations across your restaurant chain", icon: <LayoutDashboard size={22} /> },
              { title: "Multi-Branch Management", desc: "Coordinate deliveries and drivers across multiple restaurant locations", icon: <Building2 size={22} /> },
              { title: "Real-Time Delivery Tracking", desc: "Monitor all active deliveries with live GPS tracking and status updates", icon: <MapPin size={22} /> },
              { title: "Driver Mobile Application", desc: "Easy-to-use mobile app for drivers to manage their delivery assignments", icon: <Smartphone size={22} /> },
              { title: "Reports and Analytics", desc: "Comprehensive insights into delivery performance, driver efficiency, and trends", icon: <BarChart3 size={22} /> },
              { title: "Driver Management", desc: "Assign, track, and manage your entire fleet of delivery drivers", icon: <Users size={22} /> },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 group items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-[#e45d05] text-white shadow-lg shadow-orange-100 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-[#E05C00] transition-colors">{item.title}</h3>
                  <p className="text-sm text-[#5F5F5F] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section: Real-Time Delivery Tracking --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <h2 className="font-[Poppins] text-3xl font-medium text-center mb-16">Real-Time Delivery Tracking</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/3">
              <p className="font-[Poppins] text-xl font-medium leading-snug text-[#232323]">
                Gain Full Visibility Into Your Delivery Operations With Clear Routes And Live Order Progress
              </p>
            </div>
            <div className="md:w-2/3 flex justify-center">
              <img src="./images/image2.png" alt="Tracking Map" className="w-full max-w-[500px] object-contain drop-shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* --- Section: How It Works? --- */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-[Poppins] text-3xl font-medium mb-4">How It Works?</h2>
          <p className="text-[#5F5F5F] font-medium text-xl mb-16 max-w-2xl mx-auto font-[Poppins]">A streamlined three-step process from order creation to delivery completion</p>
          <div className=" font-[Poppins] grid md:grid-cols-3 gap-8 relative">
            <StepCard number="01" icon={<Settings size={26}/>} title="Admin Creates Operations" desc="Operations managers use the admin dashboard to create delivery orders and manage branches." />
            <StepCard number="02" icon={<Bell size={26}/>} title="Drivers Receive Requests" desc="Drivers receive instant notifications on their mobile app with order and location details." />
            <StepCard number="03" icon={<CheckCircle size={26}/>} title="Real-Time Tracking" desc="Deliveries are tracked in real-time as drivers update status and admins monitor progress." />
          </div>
        </div>
      </section>

      {/* --- Section: Platform Overview --- */}
      <section id="platform" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-[Poppins] text-3xl font-medium mb-4">Platform Overview</h2>
            <p className="text-[#5F5F5F] font-medium text-xl font-[Poppins]">Powerful interfaces designed for both administrators and drivers</p>
          </div>

          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#e45d05] rounded-xl flex items-center justify-center text-white shadow-md"><LayoutDashboard size={24} /></div>
              <div>
                <h3 className="font-[Poppins] font-medium  text-xl">Admin Dashboard</h3>
                <p className="text-sm font-[Poppins]  text-[#7C7C7C]">Web-based management console</p>
              </div>
            </div>
            <div className="bg-[#F8F9FA] border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
               <div className="flex items-center gap-2 mb-8 text-[#5F5F5F] text-xs font-bold uppercase tracking-widest">
                  <div className="w-4 h-4 rounded-full border-2 border-[#e45d05] flex items-center justify-center"><div className="w-1 h-1 bg-[#e45d05] rounded-full"></div></div>
                  Dashboard Overview
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard value="247" label="Active Deliveries" />
                  <StatCard value="42" label="Online Drivers" />
                  <StatCard value="1" label="Restaurant" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm min-h-[140px] border border-gray-50 flex flex-col justify-between">
                    <span className="font-[Poppins] text-xs text-[#5F5F5F] font-bold uppercase tracking-tighter">📊 Analytics</span>
                    <div className="h-2 bg-gray-100 rounded-full w-full relative overflow-hidden">
                       <div className="absolute top-0 left-0 h-full bg-[#e45d05]/20 w-3/4"></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm min-h-[140px] border border-gray-50 flex flex-col justify-between">
                    <span className="font-[Poppins] text-xs text-[#5F5F5F] font-bold uppercase tracking-tighter">📍 Live Map</span>
                    <div className="h-2 bg-gray-100 rounded-full w-2/3"></div>
                  </div>
               </div>
            </div>
            <ul className="mt-8 space-y-2 text-[#5F5F5F] text-lg font-[Poppins]">
              <li>• Real-time delivery tracking map</li>
              <li>• Driver performance analytics</li>
              <li>• Multi-branch coordination</li>
            </ul>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-16 pt-12">
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#e45d05] rounded-xl flex items-center justify-center text-white shadow-md"><Smartphone size={24} /></div>
                <div>
                  <h3 className="font-[Poppins] font-medium  text-xl">Driver Mobile App</h3>
                  <p className="text-sm font-[Poppins]  text-[#7C7C7C]">iOS and Android application</p>
                </div>
              </div>
              <ul className="space-y-4 text-[#5F5F5F] text-lg font-[Poppins]">
                <li>• Instant delivery notifications</li>
                <li>• Integrated GPS navigation</li>
                <li>• Real-time status updates</li>
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-[280px] h-[520px] bg-[#7C7C7C] rounded-[3rem] border-[10px] border-[#7C7C7C] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#7C7C7C] rounded-b-2xl z-20"></div>
                <div className="bg-white w-full h-full p-6 pt-12 flex flex-col">
                   <div className="w-full h-36 bg-gray-100 rounded-2xl mb-8 border border-gray-200"></div>
                   <div className="space-y-3">
                      <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                   </div>
                   <div className="w-full h-12 bg-[#e45d05] rounded-xl mt-auto mb-4 flex items-center justify-center shadow-lg shadow-orange-100">
                      <div className="w-10 h-1 bg-white/40 rounded-full"></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section: FAQ --- */}
      <section id="faqs" className="py-24 bg-white border-t border-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className=" font-[Poppins] text-3xl font-medium text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-2 font-[Poppins]">
            <FAQItem 
              question="What Is This Delivery System?" 
              answer="Loop Delivery is a centralized management platform designed for restaurant chains and businesses to coordinate their logistics, monitor driver performance, and track orders in real-time."
            />
            <FAQItem 
              question="Who The System Designed For?" 
              answer="The system is tailor-made for business owners (Companies) who need to manage multiple branches and a fleet of drivers, as well as for individual delivery drivers looking for an efficient app to manage their requests."
            />
            <FAQItem 
              question="Can Orders Be Tracked In Real-Time?" 
              answer="Yes! Our platform provides live GPS tracking, allowing administrators to see exactly where drivers are on a map and monitor the progress of every delivery from start to finish."
            />
            <FAQItem 
              question="Can Drivers Accept Or Reject Delivery Requests?" 
              answer="Absolutely. Drivers receive instant push notifications for new requests and have the flexibility to accept or decline based on their current status and proximity."
            />
            <FAQItem 
              question="Is The System Secure?" 
              answer="Security is our priority. We use industry-standard encryption and secure authentication methods to ensure that all business, driver, and customer data remains protected."
            />
            <FAQItem 
              question="Can The System Be Customized?" 
              answer="Yes, the platform offers various settings for branches and fleet management to ensure it fits the specific workflow of your delivery operations."
            />
          </div>
        </div>
      </section>

      {/* --- Section: Final CTA (Banner) --- */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* خلفية الصورة مع التعديلات لتطابق صورتك */}
        <div className="absolute inset-0 z-0 bg-[#1a1a1a]"> {/* خلفية غامقة أساسية */}
          <img
            src="./images/landingpage2.jpg"
            className="w-full h-full object-cover object-top opacity-60" 
            /* object-top: بتنزل الصورة لتحت ليبين راسها */
            /* opacity-60: بتعطي نفس تأثير التعتيم اللي بالصورة */
            alt="Delivery"
          />
          {/* طبقة إضافية للتعتيم المتدرج كرمال النص يوضح أكتر */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h2 className=" font-[Poppins] text-3xl md:text-5xl font-bold text-[#E05C00] mb-6 leading-tight">
            Ready To Streamline Your <br/> <span className="text-[#E05C00] font-[Poppins]">Deliveries?</span>
          </h2>
          <p className="text-gray-200 mb-10 text-lg opacity-90 font-[Poppins]">Download the driver app to manage orders, routes, and deliveries with ease</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button onClick={handlePrimaryAction} className="bg-[#E05C00] text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-[#c44e04] transition-all flex items-center justify-center gap-2">
               + New Delivery Request
             </button>
             <button className="bg-transparent border-2 border-orange-600 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
               📲 Download Driver App
             </button>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white py-20 px-6 border-t border-gray-100 text-[#5F5F5F]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-[#E05C00] font-bold text-2xl mb-6">Loop Delivery</h3>
            <p className="leading-relaxed text-sm">
              Delivery Management System for streamline operations with centralized control and real-time tracking.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-[#232323] mb-6">Platform</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-[#E05C00]">Admin Dashboard</a></li>
              <li><a href="#" className="hover:text-[#E05C00]">Driver App</a></li>
              <li><a href="#features" className="hover:text-[#E05C00]">Features</a></li>
              <li><a href="#" className="hover:text-[#E05C00]">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#232323] mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li>support@loopdelivery.com</li>
              <li>1-800-DELIVERY</li>
              <li>Lebanon, Beirut</li>
            </ul>
          </div>

          <div className="flex flex-col md:items-end gap-6">
            <div className="flex gap-4">
               <div className="w-10 h-10 bg-[#e45d05] rounded-full flex items-center justify-center text-white cursor-pointer shadow-md">f</div>
               <div className="w-10 h-10 bg-[#e45d05] rounded-full flex items-center justify-center text-white cursor-pointer shadow-md">i</div>
               <div className="w-10 h-10 bg-[#e45d05] rounded-full flex items-center justify-center text-white cursor-pointer shadow-md">t</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© 2026 Loop Delivery. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#E05C00]">Privacy Policy</a>
            <a href="#" className="hover:text-[#E05C00]">Terms Of Services</a>
            <a href="#" className="hover:text-[#E05C00]">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- المكونات الفرعية لضمان النظافة (Sub-components) ---

function FAQItem({ question, answer }: { question: string, answer: string }) {
  return (
    <div className="border-b border-gray-100 group">
      <details className="py-6 cursor-pointer">
        <summary className="flex justify-between items-center list-none font-medium text-lg text-[#232323] group-hover:text-[#E05C00] transition-colors">
          {question}
          <ChevronDown className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <p className="mt-4 text-[#5F5F5F] leading-relaxed text-base font-normal">
          {answer}
        </p>
      </details>
    </div>
  );
}

function StepCard({ number, icon, title, desc }: { number: string, icon: any, title: string, desc: string }) {
  return (
    <div className="relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center group hover:shadow-xl transition-all duration-300">
      <span className="absolute -top-3 right-8 px-4 py-1 bg-[#e45d05] text-white text-xs font-bold rounded-full shadow-lg">{number}</span>
      <div className="w-16 h-16 bg-[#e45d05] rounded-2xl flex items-center justify-center text-white mb-6 shadow-orange-100 shadow-xl group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="font-bold text-xl mb-3 text-[#232323]">{title}</h3>
      <p className="text-sm text-[#5F5F5F] leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string, label: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 text-left hover:border-orange-100 transition-colors">
      <div className="text-3xl font-bold text-[#232323]">{value}</div>
      <div className="text-[10px] text-gray-400 font-extrabold mt-2 uppercase tracking-widest">{label}</div>
    </div>
  );
}