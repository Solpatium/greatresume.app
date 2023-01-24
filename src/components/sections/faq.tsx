const faqs = [
    {
        question: 'How do you process my data?',
        answer: "Your data is only used to generate your resume and it does not leave your browser. Our application doesn't use any server to generate your resume. It uses javascript to generate it in your browser, securely and privately.",
    },
    {
        question: 'Why is there no cookie consent bar?',
        answer: "Because it is not needed. Your data is only used to generate resumes. Generating them happens in your browser, we don't send your information anywhere.",
    },
    { 
        question: "I've created a resume some time ago, how do I edit it?", 
        answer: "Go to /start and select the 'import' option. Please note that this option only works for pdfs generated throught my application." 
    },
    {
        question: "How do I report a bug?",
        answer: "Github issues are used to track bugs. Please note that all issues are public, make sure you don't include any data you want to keep private! You can create issue on github here.",
    },
    {
        question: "How do you make money?",
        answer: "I don't."
    },
    {
        question: "What do you mean you don't make money out of this?",
        answer: "I just want to make resume creation accessible for everyone. It all started when my mother lost her job and I wanted to find some resume creators. I found a lot of them baiting you with the promise of 'free resume creator' only to allow you to export for free only to a text file (yes, a regular .txt file), forcing you to pay for pdf. You learn this only after you fill ALL YOUR DATA. I think this process can be even more infuriating for people who are not tech savvy. Of course you can pay for resume creator, but for some people it is not an option."
    },
    {
        question: "What much does it cost you to host this application?",
        answer: "All processing is done on client's side, so I don't need to maintain costly servers. I still need to host code and all the assets. I pay 20$ per month to host it on vercel.com and about 23$ per year."
    },
    {
        question: "How can I be sure you are not lying?",
        answer: "You can see the source code yourself *here*."
    },
];

export const FAQ = () => {
    return <div id="faq"><QuestionsList
        title="Frequently asked questions"
        description="Can't find the answer you're looking for? Contact us. There is also a technical FAQ available here."
        items={faqs}
    /></div>
}

const technicalFaqs = [
    {
        question: "What technology stack is used?",
        answer: "This is a https://reactjs.org/ app using https://nextjs.org/ framework and https://tailwindcss.com/ for styling.",
    },
    {
        question: "How is data stored?",
        answer: "Data is stored in browser using local/session storage, depending on user's choice."
    },
    {
        question: "How do you generate pdf files in the browser?",
        answer: "I use an excellent https://react-pdf.org/ library to generate structure of the document like regular react components and then generate a pdf from it.",
    },
    {
        question: "How do you generate preview for pdf in the browser?",
        answer: "Mozilla's https://mozilla.github.io/pdf.js/ makes it all possible.",
    },
    {
        question: "How does import from pdf work?",
        answer: "When you export pdf its model is embeded in the document as a json file. During import we simply look for this file and load data from it. This is done with the help of https://pdf-lib.js.org/.",
    },
    {
        question: "",
        answer: "",
    },
];

export const TechnicalFAQ = () => {
    return <QuestionsList
        title="Technical questions"
        description="Answers for people who want to know excatly how it works."
        items={technicalFaqs}
    />
}

type Item = {
    question: string;
    answer: React.ReactElement | string;
}
const QuestionsList: React.FC<{ title: string; description: React.ReactElement | string; items: Item[] }> = (props) => {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:py-40 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-5">
                        <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
                            {props.title}
                        </h2>
                        <p className="mt-4 text-base leading-7 text-gray-600">
                            {props.description}
                        </p>
                    </div>
                    <div className="mt-10 lg:col-span-7 lg:mt-0">
                        <dl className="space-y-10">
                            {props.items.map((item) => (
                                <div key={item.question}>
                                    <dt className="text-base font-semibold leading-7 text-gray-900">{item.question}</dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{item.answer}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
};