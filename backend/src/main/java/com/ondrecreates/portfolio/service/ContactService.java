package com.ondrecreates.portfolio.service;

import com.ondrecreates.portfolio.dto.ContactRequestDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

// Servisní vrstva pro zpracování kontaktního formuláře
@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    /**
     * Zpracuje příchozí zprávu z formuláře.
     * Fáze 1: zaloguje zprávu.
     * Fáze 2 (TODO): odeslat e-mailem přes JavaMailSender nebo Resend API.
     */
    public void processContact(ContactRequestDto dto) {
        log.info("Nová zpráva z portfolia | od: {} <{}>", dto.name(), dto.email());
        log.debug("Obsah zprávy: {}", dto.message());

        // TODO: napojit odesílání e-mailu
        // mailService.send(dto);
    }
}
