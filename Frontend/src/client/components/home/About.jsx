import SectionTitle from "../shared/SectionTitle";

function About() {
    return (
        <div>
            <SectionTitle>درباره فان پارک</SectionTitle>
            <div className="flex max-xs:flex-col gap-10 my-10 max-xs:px-4 max-xs:my-2">
                <p className="w-1/2 max-xs:w-full max-xs:text-xs text-zinc-500 leading-8 max-xs:leading-6">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                </p>
                <div className="w-1/2 h-80 max-xs:hidden">
                    <img src="/images/aboutus.webp" className="h-full w-full object-cover" alt="" />
                </div>
            </div>
        </div>
    );
};

export default About;
