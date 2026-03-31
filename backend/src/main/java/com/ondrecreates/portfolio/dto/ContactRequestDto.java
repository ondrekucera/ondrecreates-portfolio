package com.ondrecreates.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// Data přijatá z kontaktního formuláře
public record ContactRequestDto(

        @NotBlank(message = "Jméno nesmí být prázdné")
        @Size(max = 100, message = "Jméno může mít max. 100 znaků")
        String name,

        @NotBlank(message = "E-mail nesmí být prázdný")
        @Email(message = "Zadej platný e-mail")
        String email,

        @NotBlank(message = "Zpráva nesmí být prázdná")
        @Size(min = 10, max = 2000, message = "Zpráva musí mít 10–2000 znaků")
        String message
) {}
