import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const navigation = [
    { name: 'About', href: '#' },
    { name: 'Examples', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Author', href: '#' },
];


export const LaunchButton = () => {
    return (
        <Link
            href="/languages"
            className="inline-block rounded-lg bg-indigo-600 px-5 py-3 text-xl font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
        >
            Let's go!{' '}
            <span className="text-indigo-200" aria-hidden="true">
                &rarr;
            </span>
        </Link>
    );
}

const Title = () => {
    return (<>
        <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
            Create a <span className="text-blue-600">Great Resume</span> completely for <span className="text-blue-600">free</span>
        </h1>
        <h2 className="text-3xl font-bold tracking-tight sm:text-center sm:text-5xl text-gray-700">
            No strings attached.
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
            Use one of 20 professional templates to create a resume and export it to a PDF file. All completly private and free, because people looking for a job shouldn't have to pay a penny to create a good CV.
        </p>
        <div className="mt-8 flex gap-x-4 sm:justify-center">
            <LaunchButton />
        </div>
    </>)
}

const Navbar = () => {
    return (
        <div className="px-6 pt-6 lg:px-8 max-w-7xl m-auto">
            <div>
                <nav className="flex h-9 items-center space-between" aria-label="Global">
                    <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">GreatResume app</span>
                            <HandThumbUpIcon className="h-8 text-[#4f46e5]"/>
                        </a>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-end	 gap-x-3 sm:gap-x-6 md:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="font-semibold text-gray-900 hover:text-gray-900">
                                {item.name}
                            </a>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    )
}

const BottomGradient = () => (<div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
    <svg
        className="relative -top-40 left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
        viewBox="0 0 1155 678"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
            <linearGradient
                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
        </defs>
    </svg>
</div>)


export const HeroSection = () => {
    return (
        <div className="isolate bg-white">
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
                <svg
                    className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
                    viewBox="0 0 1155 678"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                        fillOpacity=".3"
                        d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                    />
                    <defs>
                        <linearGradient
                            id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                            x1="1155.49"
                            x2="-78.208"
                            y1=".177"
                            y2="474.645"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#9089FC" />
                            <stop offset={1} stopColor="#FF80B5" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <Navbar />
            <main>
                <div className="relative px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
                        <div className="flex flex-col gap-4">
                            <Title />
                            <BottomGradient />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}