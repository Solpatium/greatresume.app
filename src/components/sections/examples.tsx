import Image from "next/image"
import { useRouter } from "next/router"
import { useImportState } from "../../state/storage"
import { makeClientOnly } from "../atoms/clientOnly"
import useTranslation from "next-translate/useTranslation"
import { useTemplateDetails } from "../../resumes/templateDetails"

export const Examples = makeClientOnly(() => {
    const { t } = useTranslation("home");
    const saveData = useImportState();
    const { push } = useRouter();
    const templates = useTemplateDetails();
    return (
        <div id="examples" className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mb-10">
                    <h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                        {t("examples.title")}
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500">
                        {t("examples.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {Object.values(templates).map((details, index) => (
                        <button
                            type="button"
                            key={index}
                            className="group"
                            onClick={
                                () => details.example()
                                    .then(saveData)
                                    .then((saved) => {
                                        if(!saved) {
                                            return;
                                        }
                                        return push("/languages?skip-start").catch(console.error)
                                    })
                            }
                        >
                            <div className="w-full">
                                <Image
                                    src={details.image}
                                    // TODO i18n!
                                    // alt={product.imageAlt}
                                    className="shadow-md group-hover:opacity-75"
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                                <h3>{details.title}</h3>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
});