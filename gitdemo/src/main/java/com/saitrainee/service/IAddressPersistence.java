package com.saitrainee.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saitrainee.entities.address;


public interface IAddressPersistence extends JpaRepository<address, Long> {

		
	}

