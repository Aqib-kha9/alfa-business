import Link from "next/link";
import { Mail } from "lucide-react";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
export default function Footer() {
    return (
        <footer className="bg-gray-50 text-black pt-14 pb-10">
            <div className="max-w-7xl mx-auto px-8 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-4">

                {/* Address & Contact Info */}
                <div className="md:col-span-4 space-y-4 text-sm">
                    <div className="flex items-center gap-4">
                        {/* <Image src="/logowhite.png" alt="Alfa Logo" width={60} height={60} /> */}
                        <span className="text-2xl font-bold text-gray-900">Alfa Business Center</span>
                    </div>
                    <p>
                        Dattani Tower, Mid Wing, Kore Kendra,<br />
                        Borivali (West), next to McDonald,<br />
                        Mumbai, Maharashtra 400092
                    </p>
                    <p>
                        Email:{" "}
                        <a href="mailto:info@alfaesol.com" className="hover:underline">
                            info@alfaesol.com
                        </a>
                    </p>
                    <p>
                        Phone:{" "}
                        <a href="tel:9820190836" className=" hover:underline">
                            98201 90836
                        </a>
                    </p>
                </div>

                {/* Links Section (Better Layout) */}
                <div className="md:col-span-4 text-sm">
                    <div className="flex flex-col md:flex-row gap-12">

                        {/* Links */}
                        <div className="md:w-1/2 space-y-2">
                            <h4 className="font-bold text-gray-900 mb-3">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/pricing">Pricing</Link></li>
                                <li><Link href="/amenities">Our Amenities</Link></li>
                                <li><Link href="/gallery">Gallery</Link></li>
                                <li><Link href="/pay-online">Pay Online</Link></li>
                                <li><Link href="/contact">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Navigate */}
                        <div className="md:w-1/2 space-y-2">
                            <h4 className="font-bold text-gray-900 mb-3">Policies</h4>
                            <ul className="space-y-2">
                                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                                <li><Link href="/terms-of-use">Terms of Use</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Subscribe Form */}
                <div className="md:col-span-4 space-y-4 text-sm">
                    <h4 className="font-bold text-[#2d386a]">Subscribe</h4>
                    <p className="text-gray-600">
                        Subscribe to our e-mail list and stay up-to-date with all our news.
                    </p>
                    <form className="flex flex-col gap-2">
                        <div className="flex overflow-hidden rounded-md bg-gray-100 shadow-sm">
                            <div className="px-3 flex items-center text-gray-600">
                                <Mail size={16} />
                            </div>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 bg-gray-100 px-3 py-2 text-sm outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-[#2d386a] text-white px-4 text-sm font-semibold hover:bg-[#1f2a4f] transition rounded-r-md"
                            >
                                Subscribe
                            </button>
                        </div>
                        <label className="text-xs text-gray-600 flex items-start gap-2">
                            <input type="checkbox" className="mt-1" required />
                            I have read and agree to the{" "}
                            <Link href="/terms-of-use" className="underline text-[#2d386a]">
                                terms & conditions
                            </Link>.
                        </label>
                    </form>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 border-t pt-6 px-8 lg:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                <div className="text-center">
                    © 2025 Alfa Business Center. All rights reserved.
                </div>
                <div className="flex gap-4 text-gray-600 text-lg">
                    <Link href="#"><FaTwitter className="hover:text-[#2d386a]" /></Link>
                    <Link href="#"><FaFacebookF className="hover:text-[#2d386a]" /></Link>
                    <Link href="#"><FaLinkedinIn className="hover:text-[#2d386a]" /></Link>
                    <Link href="#"><FaYoutube className="hover:text-[#2d386a]" /></Link>
                </div>
            </div>
        </footer>
    );
}
