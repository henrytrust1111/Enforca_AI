import Image from "next/image";

// Define the interface for the component props
interface LogoProps {
  width: number;
  height: number;
}

// Logo component to display the company logo
export const Logo: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/images/logo.png" // Path relative to the public folder
      alt="Company Logo"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

export const Logo2: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/logo.svg" // Path relative to the public folder
      alt="Company Logo"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// Facebook icon component
export const Facebook: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/facebook.svg" // Path relative to the public folder
      alt="Facebook Icon"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// Google icon component
export const Google: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/google.svg" // Path relative to the public folder
      alt="Google Icon"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// Apple icon component
export const Linkedin: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/linkedin.svg" // Path relative to the public folder
      alt="Apple Icon"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// Checked icon component
export const Checked: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/checked.svg" // Path relative to the public folder
      alt="Apple Icon"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// Checked icon component
export const Valid: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/valid.svg" // Path relative to the public folder
      alt="Apple Icon"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// Phone icon component
export const Phone: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/phone.svg" // Path relative to the public folder
      alt="Apple Icon"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// Envelop icon component
export const Envelope: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/envelope.svg" // Path relative to the public folder
      alt="Apple Icon"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// Checked icon component
export const Padlock: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/images/Padlock.gif" // Path relative to the public folder
      alt="Apple Icon"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// Done gif icon component
export const Done: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/images/done.gif" // Path relative to the public folder
      alt="Apple Icon"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// Success gif icon component
export const SuccessIcon: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/success.gif" // Path relative to the public folder
      alt="success"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// Dropbox gif icon component
export const Dropbox: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/dropbox.svg" // Path relative to the public folder
      alt="success"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// Google_drive gif icon component
export const GoogleDrive: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/google_drive.svg" // Path relative to the public folder
      alt="success"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// ArrowRight png icon component
export const ArrowRight: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/arrow-circle-right.svg" // Path relative to the public folder
      alt="arrow"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// ArrowRight png icon component
export const ArrowLeft: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/arrow-circle-left.svg" // Path relative to the public folder
      alt="arrow"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// ArrowRight png icon component
export const Close: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/close.svg" // Path relative to the public folder
      alt="arrow"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// ArrowRight png icon component
export const MagicWand: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/magic-wand.svg" // Path relative to the public folder
      alt="arrow"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// ArrowRight png icon component
export const ArrowRightBlack: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/arrowRightBlack.png" // Path relative to the public folder
      alt="success"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// Download svg icon component
export const Download: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/download.svg" // Path relative to the public folder
      alt="download"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};

// CVImage png image component
export const CVImage: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/images/Cv/profile.png" // Path relative to the public folder
      alt="profile"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};
// LoadingState gif component
export const LoadingAnimation: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <Image
      src="/images/loadingState.gif" // Path relative to the public folder
      alt="profile"
      width={width}
      height={height}
      priority // Use this prop if the image is critical (e.g., logo)
    />
  );
};
