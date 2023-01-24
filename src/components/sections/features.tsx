import {
    BoltIcon,
    ChatBubbleBottomCenterTextIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    ScaleIcon,
    PaintBrushIcon,
    FaceSmileIcon,
    LockClosedIcon,
    LanguageIcon,
    ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline'
import Image from "next/image";
import cvImage from "../../../public/images/cv.jpg"

const features = [
    {
        name: 'Make the resume yours',
        description: 'Select one of X templates that reflects your experience the best. Adjust its appearance by rearranging sections, adding a picture or changing paper size.',
        icon: PaintBrushIcon,
    },
    {
        name: 'No hidden fees',
        description: "Application is 100% free and doesn't offer any paid features. Just fill the form and export pdf file containing your resume.",
        icon: FaceSmileIcon,
    },
    {
        name: 'Completly private',
        description: "Your data doesn't leave your browser. We also don't server any ads.",
        icon: LockClosedIcon,
    },
    {
        name: "4 supported languages",
        description: "Currently we support English, German, French and Polish.",
        icon: LanguageIcon,
    },
    {
        name: 'Works great on any device',
        description: 'Laptop, tablet, smartphone - just choose any of them and perfect your resume.',
        icon: BoltIcon,
    },
    {
        name: "Import your pdf",
        description: "During export we save resume's structure in pdf itself. This way you can later import your resume to update it.",
        icon: ArrowUpOnSquareIcon,
    }
];

export const Features = () => {
    return (
        <div id="about" className="overflow-hidden bg-white">
            <div className="relative mx-auto max-w-3xl px-6 lg:max-w-7xl lg:px-8">
                <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 bg-[#fff6f0] p-8 sm:p-10 md:p-20 rounded-3xl">
                    <div className="relative col-span-full mb-8">
                        <h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                            No bullshit resume creator
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500">
                            Great features for free.
                        </p>
                    </div>

                    <div className="relative">
                        <dl className="space-y-10">
                            {features.map((item, index) => (
                                <div key={index} className="relative">
                                    <dt>
                                        <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
                                            <item.icon className="h-8 w-8" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 text-lg font-medium leading-6 text-gray-900">{item.name}</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">{item.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="hidden lg:block relative -mx-4 mt-10 lg:mt-0" aria-hidden="true">
                        <Image
                            className="relative mx-auto rounded-lg"
                            // width={490}
                            src={cvImage}
                            alt="Example resume"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}