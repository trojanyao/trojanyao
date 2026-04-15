export default function getProjectPlatformColorClass(platform: ProjectPlatformVisible) {
  switch (platform) {
    case 'web-desktop':
    case 'web-mobile':
      return 'bg-blue/10 text-blue';
    case 'website-desktop':
    case 'website-mobile':
    case 'android':
      return 'bg-green/10 text-green';
    case 'pwa':
    case 'weapp':
      return 'bg-purple/10 text-purple';
    case 'ios':
      return 'bg-orange/10 text-orange';
    default:
      return 'bg-primary/10 text-primary';
  }
}
