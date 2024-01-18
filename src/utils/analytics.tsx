import Script from 'next/script'


export const GoogleAnalytics: React.FC = () => {
    const id = process.env.NEXT_PUBLIC_ANALYTICS_ID;
    return <>
      <Script
        id="_next-ga-init"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
            //   gtag('consent', 'default', {
            //       'ad_storage': 'denied',
            //       'ad_user_data': 'denied',
            //       'ad_personalization': 'denied',
            //       'analytics_storage': 'denied'
            //     });

          gtag('js', new Date());
          gtag('config', '${id}');`,
        }}
      />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`}/>
    </>
}

import { ResumeModel } from "../models/v1";

declare global {
    interface Window { dataLayer?: any[] }
}

const track = (name: string, props: Record<string, any>) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", name, { props }]);
}

export const countResumeDownload = (resume: ResumeModel, fileSize: number) => {
    // Probably some empty resumes.
    if (resume.sections.length < 2) {
        return;
    }
    // console.log("TRACKING")
    const template = resume.appearance.template;
    const paperSize = resume.appearance.paperSize;
    const usedImage = !!resume.appearance.image;
    const sectionsCount = resume.sections.length;
    track("pdfDownload", { template, paperSize, usedImage, sectionsCount, fileSize });
}