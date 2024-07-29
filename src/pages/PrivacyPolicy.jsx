import { Link } from "react-router-dom";
import common, { socialMediaLink } from "../common/commonText";
import { Container } from "../components/index";

const PrivacyPolicy = () => {
  const style = {
    heading: "text-lg md:text-2xl font-bold text-gray-200 mb-2 md:mb-4",
    para: "text-sm md:text-base text-gray-400 mb-6",
    ul: "text-sm md:text-base list-disc pl-6 text-gray-400 mb-6",
  };

  return (
    <div className="text-white">
      <body class="font-sans text-white">
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-3xl font-bold text-gray-200 text-center mb-8">
            Privacy Policy
          </h1>
          <Container>
            <div className="overflow-y-auto h-96 text-white rounded-lg shadow-md pr-2">
              <h2 class={style.heading}>Introduction</h2>
              <p class={style.para}>
                At {common.orgName}, we are committed to protecting your
                privacy. This Privacy Policy outlines the types of information
                we collect, how we use it, and the measures we take to ensure
                your information is protected.
              </p>
              <h2 class={style.heading}>Information We Collect</h2>
              <ul class={style.ul}>
                <li>
                  <strong class="font-medium">Personal Information</strong>:
                  When you register on our site, subscribe to our newsletter, or
                  fill out a form, we may collect personal information such as
                  your name, email address, phone number, and other contact
                  details.
                </li>
                <li>
                  <strong class="font-medium">Usage Data</strong>: We may
                  collect information about how you access and use our website,
                  including your IP address, browser type, operating system,
                  pages visited, and the time and date of your visit.
                </li>
                <li>
                  <strong class="font-medium">
                    Cookies and Tracking Technologies
                  </strong>
                  : We use cookies and similar tracking technologies to enhance
                  your experience on our site. Cookies are small files that a
                  site or its service provider transfers to your computer’s hard
                  drive through your web browser that enables the site’s systems
                  to recognize your browser and capture and remember certain
                  information.
                </li>
              </ul>
              <h2 class={style.heading}>How We Use Your Information</h2>
              <p class={style.para}>
                We use the information we collect for various purposes,
                including:
              </p>
              <ul class={style.ul}>
                <li>
                  To personalize your experience on our site and respond to your
                  individual needs.
                </li>
                <li>
                  To improve our website based on the information and feedback
                  we receive from you.
                </li>
                <li>
                  To send periodic emails with updates, promotions, and other
                  relevant information. You can unsubscribe from these emails at
                  any time.
                </li>
                <li>
                  To administer a contest, promotion, survey, or other site
                  features.
                </li>
              </ul>
              <h2 class={style.heading}>How We Protect Your Information</h2>
              <p class={style.para}>
                We implement a variety of security measures to maintain the
                safety of your personal information when you enter, submit, or
                access your personal information. These measures include:
              </p>
              <ul class={style.ul}>
                <li>
                  Secure server connections (SSL) to encrypt sensitive
                  information.
                </li>
                <li>
                  Regular security assessments and updates to protect against
                  unauthorized access, alteration, disclosure, or destruction of
                  your personal information.
                </li>
              </ul>
              <h2 class={style.heading}>Sharing Your Information</h2>
              <p class={style.para}>
                We do not sell, trade, or otherwise transfer to outside parties
                your personally identifiable information. This does not include
                trusted third parties who assist us in operating our website,
                conducting our business, or servicing you, so long as those
                parties agree to keep this information confidential. We may also
                release your information when we believe release is appropriate
                to comply with the law, enforce our site policies, or protect
                ours or others' rights, property, or safety.
              </p>
              <h2 class={style.heading}>Third-Party Links</h2>
              <p class={style.para}>
                Occasionally, at our discretion, we may include or offer
                third-party products or services on our website. These
                third-party sites have separate and independent privacy
                policies. We, therefore, have no responsibility or liability for
                the content and activities of these linked sites. Nonetheless,
                we seek to protect the integrity of our site and welcome any
                feedback about these sites.
              </p>
              <h2 class={style.heading}>Your Consent</h2>
              <p class={style.para}>
                By using our site, you consent to our Privacy Policy.
              </p>
              <h2 class={style.heading}>Contacting Us</h2>
              <p class={style.para}>
                If there are any questions regarding this privacy policy, you
                may contact us using the information below:
              </p>
              <div class="flex flex-col items-center text-gray-400 mb-6">
                <p>
                  Contact form :-{" "}
                  <Link to="/contact" className="text-blue-300">
                    {common.clickMe}
                  </Link>
                </p>
                <p>
                  Email :-{" "}
                  <Link
                    to={`mailto:${common.orgEmail}?subject=Query%20`}
                    className="text-blue-300"
                  >
                    {common.orgEmail}
                  </Link>
                </p>
                <p>
                  Instagram DM :-{" "}
                  <Link
                    className="text-blue-300"
                    to={socialMediaLink.instagramLink}
                  >
                    {common.clickMe}
                  </Link>
                </p>
              </div>
            </div>
          </Container>
        </div>
      </body>
    </div>
  );
};

export default PrivacyPolicy;
