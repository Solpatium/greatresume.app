import Image from "next/image"
import { useRouter } from "next/router"
import { useImportState } from "../../state/storage"
import { makeClientOnly } from "../atoms/clientOnly"
import useTranslation from "next-translate/useTranslation"
import { useTemplateDetails } from "../../resumes/templateDetails"
import { Button } from "../atoms/button"

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

                <div className="overflow-x-auto sm:overflow-visible sm:m-0">
                    <div className="m-2 flex flex-nowrap grid-cols-2 gap-x-4 gap-y-4 sm:grid sm:gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                        {Object.values(templates).map((details, index) => (
                            <div key={index} className="min-w-[300px] sm:min-w-0">
                                <div className="w-full relative">
                                    <Image
                                        src={details.image}
                                        aria-hidden
                                        alt=""
                                        className="shadow-md group-hover:opacity-75"
                                    />
                                    <Button
                                        className="absolute right-2 bottom-2"
                                        onClick={() => details.example()
                                            .then(saveData)
                                            .then((saved) => {
                                                if (!saved) {
                                                    return;
                                                }
                                                return push("/creator").catch(console.error)
                                            })} tertiary>{t("examples.button")}</Button>
                                </div>
                                <div className="mt-2 sm:mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                                    <h3>{details.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
});