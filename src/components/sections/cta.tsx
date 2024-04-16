import useTranslation from "next-translate/useTranslation"
import { LaunchButton } from "./hero"

export const CTA = () => {
  const {t} = useTranslation("home");
  return (
    <div className="bg-indigo-100">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-center lg:text-left text-4xl font-bold tracking-tight text-gray-900">
          {t("action.title")}
        </h2>
        <div className="mt-10 flex justify-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <LaunchButton />
        </div>
      </div>
    </div>
  )
}