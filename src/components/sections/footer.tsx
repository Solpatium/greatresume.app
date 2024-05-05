import useTranslation from "next-translate/useTranslation"

export const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-6 flex justify-center lg:px-8">
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            {t`footer`}
          </p>
        </div>
      </div>
    </footer>
  )
}