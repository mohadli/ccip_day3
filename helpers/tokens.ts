export interface TokenInfo {
    tokenAddress: string;
    holderAddress: string;
  }
  
  export function getTokenInfo(tokenName: string): TokenInfo {
    const tokens: Record<string, TokenInfo> = {
      usdc: {
        tokenAddress: "0x5425890298aed601595a70ab815c96711a31bc65", // USDC on Avalanche Fuji
        holderAddress: "0xaA868dACbA543AacE30d69177b7d44047c2Fe27A"  // Example USDC holder
      },
      link: {
        tokenAddress: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846", // LINK on Avalanche Fuji
        holderAddress: "0x4281eCF07378Ee595C564a59048801330f3084eE"  // Example LINK holder
      },
      // Add more tokens here as needed
    };
  
    const tokenInfo = tokens[tokenName.toLowerCase()];
    
    if (!tokenInfo) {
      throw new Error(`Token information for ${tokenName} not found`);
    }
  
    return tokenInfo;
  }
  