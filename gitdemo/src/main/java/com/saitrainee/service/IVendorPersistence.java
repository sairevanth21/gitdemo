package com.saitrainee.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.saitrainee.entities.*;
import java.util.List;

public interface IVendorPersistence extends JpaRepository<Vendor, Long> {
    List <Vendor> findByCompanyName(String companyName);
    
    @Query(
    		  nativeQuery = true,
    		  value = "SELECT * FROM public.vendor WHERE GST_NO ILIKE CONCAT('%', ?1, '%')"
    		)
    		List<Vendor> lookupVendorByGST(String GSTNo);
}
