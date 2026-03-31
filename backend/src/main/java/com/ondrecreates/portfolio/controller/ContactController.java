package com.ondrecreates.portfolio.controller;

import com.ondrecreates.portfolio.dto.ContactRequestDto;
import com.ondrecreates.portfolio.dto.ContactResponseDto;
import com.ondrecreates.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// REST controller pro kontaktní formulář
@RestController
@RequestMapping("/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    /**
     * POST /contact
     * Přijme zprávu z formuláře, validuje vstup, předá service vrstvě.
     */
    @PostMapping
    public ResponseEntity<ContactResponseDto> sendMessage(@Valid @RequestBody ContactRequestDto request) {
        contactService.processContact(request);
        return ResponseEntity.ok(ContactResponseDto.ok());
    }

    /**
     * GET /contact/health
     * Jednoduchý health check endpoint.
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }
}
