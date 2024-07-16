import { HeroMain, HeroTimeline, Review } from "../components";

const HeroSection = () => {
  return (
    <div>
      <section>
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
          <HeroMain />
          <HeroTimeline />
          <Review />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
