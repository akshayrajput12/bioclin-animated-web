'use client'

import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { CenterUnderline } from "./ui/underline-animation"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { MapPin, Phone, Mail, Globe } from "lucide-react"

const Footer = () => {
  const services = [
    "Biostatistics and Statistical Programming",
    "Clinical Research Services",
    "Data and Analysis Services",
    "Clinical Trial Management Services",
    "CDISC Consulting Services",
    "Regulatory Services",
  ]

  const addresses = [
    {
      title: "Registered Office",
      address: "Konark Orchid, Wagholi, Pune, India-412207",
      phone: "+91 9182665924",
      email: "hr@bioclinpharm.com",
      website: "www.bioclinpharm.com",
    },
    {
      title: "India Office",
      address:
        "Hno 11-13-50, Alkapuri Colony, Ramakrishnapuram, Kothapet, Hyderabad, Telangana 500035, India",
      phone: "+91 9182665924",
    },
    {
      title: "USA Offices",
      addresses: [
        "Riddle Road, Cincinnati, Ohio, 45220",
        "332 Sugartown Road, Devon, Pennsylvania, 19333",
      ],
      phone: "+1 (484) 630-1569",
    },
  ]

  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Addresses */}
          <div className="space-y-8">
            {addresses.map((office, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold">{office.title}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  {office.addresses ? (
                    office.addresses.map((addr, idx) => (
                      <p key={idx} className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        {addr}
                      </p>
                    ))
                  ) : (
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                      {office.address}
                    </p>
                  )}
                  {office.phone && (
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 shrink-0" />
                      {office.phone}
                    </p>
                  )}
                  {office.email && (
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 shrink-0" />
                      {office.email}
                    </p>
                  )}
                  {office.website && (
                    <p className="flex items-center gap-2">
                      <Globe className="w-4 h-4 shrink-0" />
                      {office.website}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link to="/services" className="text-sm text-muted-foreground hover:text-primary">
                    <CenterUnderline label={service} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
            <div className="flex flex-col space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            &copy; {new Date().getFullYear()} Bioclinpharm. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
