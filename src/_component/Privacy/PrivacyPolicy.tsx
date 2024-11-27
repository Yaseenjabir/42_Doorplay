const PrivacyPolicy = () => {
  const h1FontSize = "text-3xl";
  const h4FontSize = "text-xl";
  const textColor = "text-titleColor";
  const paragraphFontSize = "";
  const email = "dummyxyz@gmail.com";
  const phone = "(734) 383-6759";
  const address = "2202 Woodview Dr, Ypsilanti Charter Twp, MI 48198";
  const effectiveDate = "11/25/2024";
  return (
    <section
      className="w-full max-w-[850px] mx-auto py-10 px-5 flex flex-col gap-10
    "
    >
      {/* Privacy Policy  */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h1 className={`${h1FontSize} font-bold`}>Privacy Policy</h1>
        <p className={`${paragraphFontSize}`}>
          AR Garage values your privacy and appreciates your interest in our
          site. This Privacy Policy (“Policy”) is effective as of{" "}
          {effectiveDate} and applies to information collected via this site or
          used as a result of your interaction with this site. Your prior
          activities on the site may have been governed by an earlier version of
          this Policy.
        </p>
        <p className={`${paragraphFontSize}`}>
          From time to time, we may use your information for new, unanticipated
          purposes not previously disclosed in this Policy. If our information
          practices change materially, we will post updates to this Policy on
          our site. If we have collected personally identifiable information
          from you, we will notify you of any significant changes and obtain
          your consent prior to using your information in new ways.
        </p>
      </div>
      {/* Information we collection  */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>
          The Information We Collect
        </h4>
        <p className={`${paragraphFontSize}`}>
          The information we collect varies depending upon your activities when
          visiting our Site. We collect personal and contact information such as
          name, address, phone, fax, and/or email (“Personal Information”) you
          choose to provide to us in connection with your activities on the
          site. We also collect and store information you provide us in live
          chats, as well as any other information you upload in the course of
          your activities on the site. Participation in these activities is
          completely voluntary; therefore, you can elect not to disclose, for
          example, your name or address by not participating in the activity.
        </p>
        <p className={`${paragraphFontSize}`}>
          From time to time, we may use your information for new, unanticipated
          purposes not previously disclosed in this Policy. If our information
          practices change materially, we will post updates to this Policy on
          our site. If we have collected personally identifiable information
          from you, we will notify you of any significant changes and obtain
          your consent prior to using your information in new ways.In addition,
          we automatically collect site usage information from you when you
          visit our Site. Website usage information informs us about how you use
          and navigate the Site. We may collect information including the number
          and frequency of visitors on each Web Page, your Internet Protocol
          address, referring/exit pages, your operating system, date/time stamp,
          processor or device serial number, unique device identifier,
          clickstream data, the length of your stay, and the actions you take on
          the Site. We collect and store this information on an individual basis
          and in aggregate, or combined, form.
        </p>
        <p className={`${paragraphFontSize}`}>
          Certain pages of the Site may use cookies or other means to track and
          store your information for the purposes described in this policy, and
          to allow us to recognize you as a user returning to the Site using the
          same computer and browser. A cookie is a tiny element of data that a
          website can send to your browser, which may then be stored on your
          hard drive so that our server can recognize when you return. You can
          erase or block this information from your computer at any time.
        </p>
        <p className={`${paragraphFontSize}`}>
          Analytics. To determine how many users visit our site, how often they
          visit this Site, and to better understand the areas of greatest
          interest to our visitors, we use a tool called “Google Analytics.” As
          a result of your visit to our Site, Google Analytics may collect
          information such as your domain type, your IP address and clickstream
          information. We do not combine the information collected through the
          use of Google Analytics with personally identifiable information.
          Google’s ability to use and share information collected through Google
          Analytics about your visits to this Site is restricted by the Google
          Analytics Terms of Use and the Google Privacy Policy.
        </p>
      </div>
      {/* How we use Information  */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>
          How We Use the Information We Collect
        </h4>
        <p className={`${paragraphFontSize}`}>
          We use the information we collect for the purposes stated at the point
          of collection, including providing you with the products/services you
          request. We may also use the information to contact you about your
          experience with AR Garage products and for new AR Garage products or
          services from time to time.
        </p>
      </div>
      {/* Security  */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>Security</h4>
        <p className={`${paragraphFontSize}`}>
          The security of your personal information is important to us. We
          follow generally accepted industry standards to protect the personal
          information submitted to us, and to guard that information against
          loss, misuse or alteration. Please note, however, that no method of
          transmission over the internet, or method of electronic storage, is
          100% secure. Therefore, while we use commercially reasonable means to
          protect your personal information, we cannot guarantee its absolute
          security.
        </p>
      </div>
      {/* THIRD-PARTY LINKS */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>THIRD-PARTY LINKS</h4>
        <p className={`${paragraphFontSize}`}>
          This Site may contain links to other sites maintained by third
          parties. We are not responsible for the privacy practices or the
          content of such third-party sites. We recommend that you review the
          privacy policies of those sites when you visit them.
        </p>
      </div>
      {/* QUESTIONS/CONCERNS */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>QUESTIONS/CONCERNS</h4>
        <p className={`${paragraphFontSize}`}>
          If you have questions or wish to contact us about this Policy, please
          direct inquiries to:
        </p>
        <h1>
          Email : <span>{email}</span>
        </h1>
      </div>
      {/* Terms and Conditions of Use */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>
          Terms and Conditions of Use
        </h4>
        <p className={`${paragraphFontSize}`}>
          Thank you for visiting the ARGarage.com website (the “Site”). This
          document outlines the terms and conditions that apply to each visitor
          (“User” or “You”) of the Site.
        </p>
        <p className={`${paragraphFontSize}`}>
          This Site is owned by AR Garage, located at 2202 Woodview Dr,
          Ypsilanti Charter Twp, MI 48198. We provide this Site and related
          services subject to your acceptance of and compliance with these Terms
          and Conditions (“Agreement”). Please read this Agreement carefully
          before using the Site and/or services. Your use of this Site confirms
          your unconditional acceptance of these terms. If you do not agree with
          these terms, please do not use the Site.
        </p>
      </div>
      {/* CHANGES TO THIS AGREEMENT */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>CHANGES TO THIS AGREEMENT</h4>
        <p className={`${paragraphFontSize}`}>
          We reserve the right to revise this Agreement at any time. Updates
          will be posted on this Site, and your continued use of the Site
          confirms your acceptance of the revised terms. If you do not agree to
          the changes, please discontinue use of the Site immediately.
        </p>
      </div>
      {/* PRIVACY INFORMATION */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>CHANGES TO THIS AGREEMENT</h4>
        <p className={`${paragraphFontSize}`}>
          By using this Site, you consent to the collection and use of your
          personal information as described in our Privacy Policy. If you
          provide your email to us, you may receive updates or offers. You may
          opt out at any time by contacting us at {email} or by clicking
          “Unsubscribe” in any email communication.
        </p>
      </div>
      {/* GENERAL USE AND SITE LICENSE; RESTRICTIONS */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>
          GENERAL USE AND SITE LICENSE; RESTRICTIONS
        </h4>
        <p className={`${paragraphFontSize}`}>
          All Users are allowed to view content (“Materials”) displayed on this
          Site for personal use. Building professionals intending to incorporate
          AR Garage products into projects (“Professional Users”) are granted a
          limited license to download and use product drawings, specifications,
          or other proprietary materials (“Licensed Property”) solely for those
          purposes.
        </p>
        <p className={`${paragraphFontSize}`}>
          Unauthorized use of the Licensed Property is strictly prohibited and
          will result in termination of this license. Upon termination, you must
          immediately delete all copies of the Licensed Property and cease its
          use.
        </p>
        <p className={`${paragraphFontSize}`}>
          Except as permitted above, you may not copy, modify, distribute,
          transmit, create derivative works from, or otherwise use the Licensed
          Property without express written permission.
        </p>
      </div>
      {/* GENERAL DISCLAIMER */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>GENERAL DISCLAIMER</h4>
        <p className={`${paragraphFontSize}`}>
          AR Garage strives to provide accurate and reliable information on the
          Site. However, we do not guarantee the accuracy or reliability of the
          Materials, product specifications, or other resources provided. All
          Materials are provided “as is,” without warranties of any kind, either
          express or implied.
        </p>
      </div>
      {/* COPYRIGHT & TRADEMARKS */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>COPYRIGHT & TRADEMARKS</h4>
        <p className={`${paragraphFontSize}`}>
          The content, trademarks, and service marks on this Site are the
          property of AR Garage or its licensors. Unauthorized use of these
          materials is prohibited.
        </p>
      </div>
      {/* LINKED WEBSITES */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>LINKED WEBSITE</h4>
        <p className={`${paragraphFontSize}`}>
          This Site may contain links to third-party websites. AR Garage is not
          responsible for the content or practices of these external sites. Use
          of linked sites is at your own risk.
        </p>
      </div>
      {/* NO WARRANTIES */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>NO WARRANTIES</h4>
        <p className={`${paragraphFontSize}`}>
          AR Garage makes no guarantees that the Site or its content is
          error-free, uninterrupted, or secure. Users assume all risks
          associated with using the Site.
        </p>
      </div>
      {/*LIMITATION OF LIABILITY */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>LIMITATION OF LIABILITY</h4>
        <p className={`${paragraphFontSize}`}>
          To the fullest extent permitted by law, AR Garage is not liable for
          any indirect, incidental, or consequential damages arising from the
          use or inability to use the Site, including lost profits or data.
        </p>
      </div>
      {/*APPLICABLE LAW */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>APPLICABLE LAW</h4>
        <p className={`${paragraphFontSize}`}>
          This Agreement is governed by the laws of the State of Michigan,
          without regard to its conflict of law principles. Any disputes must be
          resolved in courts located in Michigan.
        </p>
      </div>
      {/*QUESTIONS/CONCERNS */}
      <div className={`w-full flex flex-col ${textColor} gap-5`}>
        <h4 className={`${h4FontSize} font-bold`}>QUESTIONS/CONCERNS</h4>
        <p className={`${paragraphFontSize}`}>
          If you have any questions about this Agreement, please contact us at:
          <br />
          <span className="font-semibold">
            Email : <span className="font-normal">{email}</span>
          </span>
          <br />
          <span className="font-semibold">
            Call : <span className="font-normal">{phone}</span>
          </span>
          <br />
          <span className="font-semibold">
            Address : <span className="font-normal">{address}</span>
          </span>
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
