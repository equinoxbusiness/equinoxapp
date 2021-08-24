import {  useState } from "react";
// import { Fragment, useState } from "react";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Disclosure} from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
//import { PlusIcon } from "@heroicons/react/solid";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import React from "react";
import './style.css';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function GeneralNav() {
  const [onBtnClass, setOnBtnClass] = useState("inline-block chain font-11 shadow-md");
  const [offBtnClass, setOffBtnClass] = useState("inline-block chain-disabled font-11");
  const [offChk, setOffChk] = useState(true);
  const [onChk, setOnChk] = useState(false);

  function offChain() {
    setOffBtnClass("inline-block chain-disabled font-11");
    setOnBtnClass("inline-block chain font-11 shadow-md");
    setOffChk(false);
    setOnChk(true);
  };

  function onChain() {
    setOnBtnClass("inline-block chain-disabled font-11");
    setOffBtnClass("inline-block chain font-11 shadow-md");
    setOffChk(true);
    setOnChk(false);
  };
  return (
    <Disclosure as="nav" className="bg-white ">
      {({ open }) => (
        <>
          <div className="md:w-auto">
            <div className="flex justify-between ">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-start">
                  <img
                    className="block lg:hidden logo-img "
                    src="https://eqx.equinox.business/images/logo2x.png"
                    alt="Equinox"
                  />
                  <img
                    className="hidden lg:block logo-img "
                    src="https://eqx.equinox.business/images/logo2x.png"
                    alt="Equinox"
                  />
                </div>
               
              </div>
              
             
              <div className="flex  align-middle">
                <div className="hidden inline-block md:ml-12 md:flex md:justify-middle md:space-x-16 mx-16 align-middle font-20">
                    <Link
                      to="/"
                      className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 font-20 font-semibold"
                    >
                      DAPP HOME
                    </Link>
                    <Link
                      to="/dex"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1  font-20 font-semibold"
                    >
                      DEX
                    </Link>
                    <Link
                      to="/dashboard"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1  font-20 font-semibold"
                    >
                      ACCESS ORG
                    </Link>
                    <Link
                      to="#"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1  font-20 font-semibold"
                    >
                      DOCS
                    </Link>
                </div>
                {/* <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span>Connect Wallet</span>
                  </button>
                </div> */}
                <div className="block toggle-btn flex justify-between">
                  <div className={onBtnClass} onClick={() => offChain()}>
                     <input type="checkbox" className="hidden" checked={offChk} /> 
                     <label className="font-11"><span className="font-extrabold">OFF</span>CHAIN</label>
                  </div>
                  <div className={offBtnClass} onClick={() => onChain()}>
                     <input type="checkbox" className="hidden" checked={onChk} /> 
                     <label className="font-11"><span className="font-extrabold">ON</span>CHAIN</label>
                  </div>
                </div>
                {/* <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Link
                to="#"
                className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
              >
                DAPP HOME
              </Link>
              <Link
                to="#"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
              >
                DEX
              </Link>
              <Link
                to="#"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
              >
                ACCESS ORG
              </Link>
              <Link
                to="#"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
              >
                DOCS
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    tom@example.com
                  </div>
                </div>
                <button className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                >
                  Sign out
                </a>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
