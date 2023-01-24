import Image from "next/image"
import { useRouter } from "next/router"
import cvImage from "../../../public/images/cv.jpg"
import { useImportState } from "../../state/storage"
import { makeClientOnly } from "../atoms/clientOnly"

const products = [
    {
        name: 'Focus Paper Refill',
        href: '#',
        src: cvImage,
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        getData: () => import("../../resumes/examples/library").then(r => r.libraryExample),
    },
    {
        name: 'Focus Card Holder',
        href: '#',
        src: cvImage,
        imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
        getData: () => import("../../resumes/examples/library").then(r => r.libraryExample),
    },
    {
        name: 'Focus Carry Case',
        href: '#',
        src: cvImage,
        imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
        getData: () => import("../../resumes/examples/library").then(r => r.libraryExample),
    },
    {
        name: 'Focus Paper Refill',
        href: '#',
        src: cvImage,
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        getData: () => import("../../resumes/examples/library").then(r => r.libraryExample),
    },
    {
        name: 'Focus Card Holder',
        href: '#',
        src: cvImage,
        imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
        getData: () => import("../../resumes/examples/library").then(r => r.libraryExample),
    },
    {
        name: 'Focus Carry Case',
        href: '#',
        src: cvImage,
        imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
        getData: () => import("../../resumes/examples/library").then(r => r.libraryExample),
    },
    // More products...
]

export const Examples = makeClientOnly(() => {
    const saveData = useImportState();
    const { push } = useRouter();
    return (
        <div id="examples" className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mb-10">
                    <h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                        Example resumes
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500">
                        Click on any resume to use it as a template.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {products.map((product, index) => (
                        <button
                            type="button"
                            key={index}
                            className="group"
                            onClick={
                                () => product.getData()
                                    .then(saveData)
                                    .then(() => push("/languages?skip-start").catch(console.error))
                            }
                        >
                            <div className="w-full">
                                <Image
                                    src={product.src}
                                    alt={product.imageAlt}
                                    className="rounded-lg group-hover:opacity-75"
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                                <h3>{product.name}</h3>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
});