'use client'
import React, { useState } from 'react';
import { HouseIcon, Menu, X, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Session } from "next-auth";
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';




interface NavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: NavbarProps ) => {
  const [isOpen, setIsOpen] = useState(false);

  const AuthSection = () => {
    if (session?.user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-emerald-50">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              {session.user.image ? (
                <Image 
                  src={session.user.image} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                  height={20}
                  width={20}
                />
              ) : (
                <User className="h-4 w-4 text-emerald-500" />
              )}
            </div>
            <span className="text-gray-700">
              {session.user.name || session.user.email?.split('@')[0] || 'User'}
            </span>
            {session.user.role === 'ADMIN' && (
              <span className="ml-1 text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                Admin
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <Link href="/dashboard">
              <DropdownMenuItem className="cursor-pointer">
                Dashboard
              </DropdownMenuItem>
            </Link>
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer">
                Profile Settings
              </DropdownMenuItem>
            </Link>
            {session.user.role === 'ADMIN' && (
              <Link href="/admin">
                <DropdownMenuItem className="cursor-pointer">
                  Admin Panel
                </DropdownMenuItem>
              </Link>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-red-500" 
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Link href="/login">
        <button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors">
          Sign In
        </button>
      </Link>
    );
  };

  return (
    <nav className="relative">
      {/* Main Navbar */}
      <div className="  ">
        <div className="flex items-center justify-between h-16 px-4 bg-gray-100 rounded-md">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={"/"} className="text-emerald-500 text-2xl font-normal flex items-center justify-center">
              <HouseIcon className='mx-2 h-6 w-6' /> Market<span className='font-bold'>Hub</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-slate-600 text-sm font-medium hover:text-emerald-500 transition-colors">
              HOME
            </Link>
            
            <Link href="/about" className="text-slate-600 text-sm font-medium hover:text-emerald-500 transition-colors">
              ABOUT
            </Link>
            <Link href="/search" className="text-slate-600 text-sm font-medium hover:text-emerald-500 transition-colors">
              ALL LISTINGS
            </Link>
            <Link href="/companies" className="text-slate-600 text-sm font-medium hover:text-emerald-500 transition-colors">
              COMPANIES
            </Link>
            <Link href="/blogs" className="text-slate-600 text-sm font-medium hover:text-emerald-500 transition-colors">
              NEWS
            </Link>
            
            {/* <Link href="/calculators" className="text-slate-600 text-sm font-medium hover:text-emerald-500 transition-colors">
            BOND CALCULATORS
            </Link> */}
            {session?.user && (
              <Link href="/favourites" className="text-slate-600 text-sm font-medium hover:text-emerald-500 transition-colors">
                FAVOURITES
              </Link>
            )}
            {/* <Link href="/contact" className="text-slate-600 text-sm font-medium hover:text-emerald-500 transition-colors">
              CONTACT
            </Link> */}
            <AuthSection />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-emerald-500 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-50 border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
          
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-500"
            >
              ABOUT
            </Link>
            <Link
              href="/search"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-500"
            >
              ALL LISTINGS
            </Link>
            <Link
              href="/companies"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-500"
            >
              COMPANIES
            </Link>
            <Link
              href="/blogs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-500"
            >
              NEWS
            </Link>
            {/* <Link
              href="/calculators"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-500"
            >
              BOND CALCULATORS
            </Link> */}
            {session?.user && (
              <Link
                href="/favourites"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-500"
              >
                FAVOURITES
              </Link>
            )}
            {/* <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-500"
            >
              CONTACT
            </Link> */}
            {session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-500"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-500"
                >
                  Profile Settings
                </Link>
                {session.user.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-500"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="px-3 py-2">
                <Link href="/login">
                  <button className="w-full bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors">
                    Sign In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;