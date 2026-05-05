interface BannerProps {
  title: string;
}

const Banner = ({ title }: BannerProps) => (
  <h1 className="text-4xl font-bold m-4">{title}</h1>
);

export default Banner;