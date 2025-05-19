// Create a separate utility file for content validation
const profanityPatterns = {
    offensive: /\b(hate|stupid|idiot|dumb|duffer)\b/gi,
    aggressive: /\b(kill|death|threat|attack|rape)\b/gi,
    inappropriate: /\b(nsfw|xxx|porn)\b/gi,
    spam: /\b(casino|lottery|winner|crypto|bitcoin|forex)\b/gi
};

export const validateContent = (text) => {
    // Check for offensive language
    if (profanityPatterns.offensive.test(text)) {
        return "Please use professional language";
    }
    
    // Check for aggressive content
    if (profanityPatterns.aggressive.test(text)) {
        return "This type of content is not allowed";
    }
    
    // Check for inappropriate content
    if (profanityPatterns.inappropriate.test(text)) {
        return "Inappropriate content detected";
    }
    
    // Check for spam
    if (profanityPatterns.spam.test(text)) {
        return "This appears to be spam content";
    }
    
    return null;
};