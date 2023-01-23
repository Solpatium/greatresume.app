import { LaunchButton } from "./hero"

export const CTA = () => {
    return (
        <div className="bg-indigo-100">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Ready to dive in?
              <br />
              Create your resume for free.
            </h2>
            <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
              <LaunchButton />
            </div>
          </div>
        </div>
      )
}