package com.ondrecreates.portfolio.dto;

// Odpověď po úspěšném zpracování zprávy
public record ContactResponseDto(
        String message,
        boolean success
) {
    // Tovární metody pro přehlednost v controlleru
    public static ContactResponseDto ok() {
        return new ContactResponseDto("Zpráva přijata, ozvu se co nejdřív.", true);
    }
}
