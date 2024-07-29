import common, { socialMediaLink } from "../common/commonText";
import { Container } from "../components/index";
import { Link } from "react-router-dom";

const About = () => {
  const style = {
    heading: "text-lg md:text-2xl font-bold text-gray-200 mb-2 md:mb-4",
    para: "text-sm md:text-base text-gray-400 mb-6",
    ul: "text-sm md:text-base list-disc pl-6 text-gray-400 mb-6",
  };

  return (
    <div className="font-sans">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-200 text-center mb-8">
          About {common.orgName}
        </h1>
        <Container>
          <div className="overflow-y-auto h-96 text-white rounded-lg shadow-md pr-2">
            <h2 class={style.heading}>Introduction</h2>
            <p class={style.para}>
              Welcome to {common.orgName}, your go-to platform for unlocking
              earning opportunities. At
              {common.orgName}, we believe everyone deserves the chance to earn
              money online and success, and we’re here to help you on that
              journey.
            </p>
            <h2 class={style.heading}>Our Mission</h2>
            <p class={style.para}>
              {common.orgName} was created out of a personal experience. When I
              was in college, I utilized various platforms and offers to earn
              money and discovered numerous ways to make some extra cash.
              Inspired by this, I decided to share these opportunities with
              others. Our mission is to provide college students, homemakers,
              and salaried professionals in their free time with the tools,
              resources, and knowledge to earn money and save on their
              purchases.
            </p>
            <h2 class={style.heading}>What We Offer</h2>
            <ul class={style.ul}>
              <li>
                <strong class="font-medium">Survey Platforms :- </strong>
                We feature various survey platforms that allow you to earn some
                pocket money by sharing your opinions. These opportunities are
                perfect for college students, homemakers, and anyone looking to
                make extra cash in their spare time.
              </li>
              <li>
                <strong class="font-medium">Earning Opportunities :- </strong>
                Discover diverse ways to earn money online and offline. From
                freelancing and remote work to passive income streams and side
                hustles, we provide information and resources to help you find
                and capitalize on earning opportunities that suit your
                lifestyle.
              </li>
              <li>
                <strong class="font-medium">Loot Deals :- </strong>
                Stay updated with the latest loot deals, allowing you to get
                products at cheaper prices. We scout for the best deals and
                share them with you, so you can save money on your purchases.
              </li>
              <li>
                <strong class="font-medium">Community Support :- </strong>
                Join a vibrant community of like-minded individuals who have
                same interest and enthusiasm. Share your experiences, seek
                advice, and find inspiration in our forums and social media
                channels.
              </li>
            </ul>
            <h2 class={style.heading}>Our Commitment</h2>
            <p class={style.para}>
              {common.orgName} is always there to support you. We prioritize
              transparency, reliability, and user satisfaction in everything we
              do. We continuously update our content and tools to ensure you
              have access to the most relevant and accurate information.
            </p>
            <p class={style.para}>
              Thank you for choosing {common.orgName} as your trusted platform
              in. Together, we can achieve great things and unlock a future full
              of possibilities.
            </p>
            <h2 class={style.heading}>Contact Us</h2>
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
    </div>
  );
};

export default About;
