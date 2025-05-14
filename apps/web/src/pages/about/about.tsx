const teamMembers = [
  {
    name: 'Yu-Ting Lin',
    role: 'Data Scientist & AgriTech Specialist',
    description:
      'Combines agricultural technology and data-driven problem-solving to develop sustainable, impactful solutions.',
    quote:
      'Technology empowers smarter decision-making processes and greater efficiency across the value chain.',
    image: '/photos/yu-ting.jpg',
  },
  {
    name: 'Daniel Choi',
    role: 'Strategic Analyst',
    description:
      'Identifies strategic opportunities to ensure impactful, sustainable projects that thrive in the real world.',
    quote:
      'Food systems are like markets—efficiency, innovation, and sustainability drive success.',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQHbHQx0AmunAA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1677466441321?e=1747267200&v=beta&t=LYiwcn6EOOKr8i75XakEXrsXYAdGixebUHfsKKBxTHg',
  },
  {
    name: 'Chia-Yu (Philly) Chien',
    role: 'Software Engineer',
    description:
      'Blends creativity and precision in development, ensuring seamless integration of technology and design for user-friendly experiences.',
    quote: 'Food, like the stars, aligns perfectly when you find the right balance of flavors.',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQFUVr9UGMFx5A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1704943913449?e=1747267200&v=beta&t=9rAkPrVfBgdK2JhX0u5e_cRsyiND_GHvCFpeyj7Jb2w',
  },
  {
    name: 'Nina Wang',
    role: 'Web Developer',
    description:
      'Enhances user experience, interface interactions, and responsive design with clean, structured code for scalability and readability.',
    quote: 'For me, food is the ultimate conversation starter—bright, bold, and full of life.',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQE0fxp_OFRSmA/profile-displayphoto-shrink_800_800/B56ZV5hXqtGQAg-/0/1741500546085?e=1747267200&v=beta&t=0Zi_dFV3Zw8zhZ7_wfq4pUdchWKu8zVRixzOUZ8kEv4',
  },
  {
    name: 'Guan-Wei (Alan) Huang',
    role: 'AI/ML Developer',
    description:
      'Develops AI-driven solutions to enhance information retrieval, provide actionable insights, and advance the sustainable use of agricultural byproducts.',
    quote:
      'I approach food like an engineer—leveraging AI to design flavor structures that are precise, balanced, and innovative.',
    image: '/photos/Alan.jpg',
  },
  {
    name: 'Bonnie Wan',
    role: 'UI/UX Designer',
    description:
      'Creates intuitive and user-centric designs, ensuring seamless interactions and accessibility in digital products.',
    quote: 'A great dish is crafted with balance, texture, and harmony—just like great design.',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQGQCw7NBOpAbQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720502404565?e=1747267200&v=beta&t=gZ0mPA9vgYTjke0KMSX8PPiTVbxQ-QiNLV9nqYxcDmI',
  },
];

export function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary mb-4">About Us</h1>
        <p className="text-lg text-border/80 max-w-4xl mx-auto">
          From the fields of agriculture to lines of code, and the strategies that drive growth, the
          Bites Team brings together diverse talents. Five innovators have joined forces, blending
          bites and bytes to tackle real-world challenges through technology and craft sustainable
          solutions at the Seneca Hackathon.
        </p>
        <img
          src="/bites_framework.jpg"
          alt="bites framework"
          className="w-[90%] mx-auto mt-10"
        ></img>
      </section>
      <section>
        <h1 className="text-4xl text-center font-bold text-primary mb-4">Meet Our Team</h1>
        <div className="flex flex-rol gap-10 flex-wrap justify-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 p-6 rounded-lg dark:bg-black shadow-neumorphic min-h-78 2xl:min-h-66 2xl:max-w-2xl lg:max-w-xl max-w-xs"
            >
              <img
                src={member.image}
                alt={member.name}
                className="h-50 aspect-square object-cover rounded-full shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-border">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
                <p className="text-border/80 mt-2">{member.description}</p>
                <blockquote className="text-border/40 mt-3 border-l-4 border-primary pl-4">
                  {member.quote}
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
