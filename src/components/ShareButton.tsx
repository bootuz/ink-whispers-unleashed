
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  title: string;
}

export const ShareButton = ({ title }: ShareButtonProps) => {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "The poem's link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleShare}
      className="flex items-center gap-2"
    >
      <Share2 className="w-4 h-4" />
      Share
    </Button>
  );
};
