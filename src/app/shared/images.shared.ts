type ImageProps = {
  src: string;
  alt: string;
}

interface ImagesShared {
  [key: string]: ImageProps;
}

const imagesBasePath = "/assets/images";

export const imagesShared: ImagesShared = {
  plantmaticaImage: {
    src: '/favicon.ico',
    alt: 'Plantmatica Logo',
  },
  tucanSoftwareLogoWhite: {
    src: `${imagesBasePath}/logo-white.png`,
    alt: "Tucan's Software Logo"
  },
  githubImage: {
    src: `${imagesBasePath}/git-icon.png`,
    alt: "Github Logo"
  }
}