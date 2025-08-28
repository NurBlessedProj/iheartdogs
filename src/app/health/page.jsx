"use client";
import Banner from "@/components/Banner/Banner";

export const dynamic = "force-dynamic";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import Footer from "@/components/Footer.jsx/page";
import {
  Shield,
  Heart,
  ClipboardCheck,
  AlertCircle,
  Award,
  Clock,
  Stethoscope,
  FileCheck,
} from "lucide-react";
import Image from "next/image";

function GuaranteePage() {
  return (
    <section className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Puppy health guarantee"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/70" />
        </div>
        <div className="relative h-full w-full flex flex-col justify-center items-center text-white px-4">
          <span className="text-blue-300 uppercase tracking-wider font-semibold mb-2 font-sohne">
            Health First Approach
          </span>
          <h1 className="text-3xl text-center md:text-5xl font-bold mb-4 font-playfair">
            Our Commitment to You and Your Puppy
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl font-sohne">
            We stand behind every puppy we breed with comprehensive health
            guarantees and lifetime support for your peace of mind.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <Shield className="w-10 h-10 text-blue-600" />,
            title: "Lifetime Backing",
            description:
              "Continuous support throughout your puppy's life journey",
          },
          {
            icon: <Heart className="w-10 h-10 text-blue-600" />,
            title: "Health Guarantee",
            description: "Comprehensive coverage for genetic health conditions",
          },
          {
            icon: <Stethoscope className="w-10 h-10 text-blue-600" />,
            title: "Veterinary Support",
            description:
              "Professional medical oversight and guidance when needed",
          },
          {
            icon: <FileCheck className="w-10 h-10 text-blue-600" />,
            title: "Clear Expectations",
            description: "Transparent terms and straightforward conditions",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 
              transition-all duration-300 border border-gray-200 group"
          >
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 font-playfair">
              {feature.title}
            </h3>
            <p className="text-gray-600 font-sohne">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="space-y-16">
          {/* Introduction */}
          <div className="text-center mb-12">
            <span className="text-blue-600 font-medium font-sohne">
              OUR PROMISE
            </span>
            <h2 className="text-4xl font-bold mt-2 text-gray-900 font-playfair">
              Health Guarantee Overview
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-8"></div>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-lg font-sohne">
              At our puppy breeding program, we prioritize health, temperament,
              and genetic soundness. Our comprehensive health guarantee reflects
              our confidence in our breeding practices and our commitment to the
              well-being of every puppy we place in a new home.
            </p>
          </div>

          {/* Lifetime Backing Section */}
          <section className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div
                  className="relative h-full w-full rounded-xl overflow-hidden"
                  style={{ minHeight: "250px" }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                    alt="Puppy health guarantee"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900 font-playfair">
                    Lifetime Backing
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg font-sohne">
                  We take pride in the fact that our relationship with you
                  doesn't end when you bring home a puppy from us. As reliable
                  breeders, experienced animal instructors, and passionate puppy
                  lovers, we like to believe that nothing can ever go wrong with
                  our dogs.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg font-sohne">
                  However, certain things are never in our control. A puppy's
                  health is dependent on many factors like genetics, exercise,
                  food and nutrition, and overall care. If something goes wrong,
                  we always strive to help, often even when our guarantee
                  doesn't cover it. While we may not be able to guarantee that
                  your puppy will never have a health problem, we guarantee that
                  we will do our best to ensure your new family member is a
                  healthy one!
                </p>
              </div>
            </div>
          </section>

          {/* Health Guarantee Section */}
          <section className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
            <div className="flex items-center mb-6">
              <Award className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900 font-playfair">
                Our Health Guarantee
              </h2>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl mb-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 font-playfair">
                First Year Coverage
              </h3>
              <p className="text-gray-700 leading-relaxed font-sohne">
                We don't believe your puppy is replaceable, but we do believe
                that sometimes the pain can be alleviated with the companionship
                of another furry friend. In the unlikely event of the death of a
                puppy within one year from its birth due to genetics, or if the
                dog is found to have congenital or hereditary disorders which
                adversely affect the health of your puppy, we will replace the
                pet with another of equivalent value at no cost to you. The
                cause of death or condition must be certified by a licensed
                veterinarian.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 font-playfair">
                Extended Coverage
              </h3>
              <p className="text-gray-700 leading-relaxed font-sohne">
                For genetic conditions that manifest later in life, we offer
                extended coverage. If your puppy develops a serious genetic
                condition within two years of age that significantly impacts
                quality of life (as confirmed by a licensed veterinarian), we
                will provide a credit amounting to 50% of the original cost
                towards the purchase of a replacement dog of similar value.
              </p>
            </div>
          </section>

          {/* Requirements Section */}
          <section className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
            <div className="flex items-center mb-6">
              <ClipboardCheck className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900 font-playfair">
                What We Need From You
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg font-sohne">
              Nothing delights us more than knowing we were able to bring a
              healthy, happy puppy to you. We do seek your help to ensure your
              dog remains healthy. Here are a few measures that will help
              maintain our guarantee:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors duration-300 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                    1
                  </div>
                  <h3 className="font-semibold text-gray-900 font-playfair">
                    Initial Veterinary Exam
                  </h3>
                </div>
                <p className="text-gray-700 font-sohne">
                  Send us a copy of the examination (medical record) within 3
                  working days of receiving your puppy. The examination must be
                  performed by a licensed veterinarian. Your dog will come with
                  up-to-date, age-appropriate vaccinations, so ensure you do not
                  vaccinate within the first ten days of receiving your puppy.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors duration-300 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                    2
                  </div>
                  <h3 className="font-semibold text-gray-900 font-playfair">
                    Ongoing Healthcare
                  </h3>
                </div>
                <p className="text-gray-700 font-sohne">
                  Maintain regular veterinary care including all recommended
                  vaccinations, examinations, and preventative treatments.
                  Puppies require regular exercise and mental stimulation -
                  providing these is essential for their overall health and
                  well-being.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors duration-300 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                    3
                  </div>
                  <h3 className="font-semibold text-gray-900 font-playfair">
                    Proper Nutrition
                  </h3>
                </div>
                <p className="text-gray-700 font-sohne">
                  Feed your puppy high-quality food appropriate for their age,
                  size, and activity level. Maintain a healthy weight as obesity
                  can lead to numerous health issues in active breeds.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors duration-300 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                    4
                  </div>
                  <h3 className="font-semibold text-gray-900 font-playfair">
                    Documentation
                  </h3>
                </div>
                <p className="text-gray-700 font-sohne">
                  Keep detailed records of all veterinary visits, vaccinations,
                  and treatments. In the event of a health concern, proper
                  documentation will be necessary to process any claims under
                  our guarantee.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <p className="text-blue-800 font-sohne">
                  <strong>Important:</strong> While we deworm and vaccinate your
                  puppy until the departure date, we'd like you to continue
                  proper deworming and conducting regular check-ups as
                  recommended by your veterinarian. Failure to provide proper
                  care may void aspects of this health guarantee.
                </p>
              </div>
            </div>
          </section>

          {/* Exceptions Section */}
          <section className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
            <div className="flex items-center mb-6">
              <AlertCircle className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900 font-playfair">
                Limitations of Our Guarantee
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg font-sohne">
              While we stand behind the health of our puppies, there are certain
              aspects that fall outside the scope of our guarantee:
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 font-playfair">
                Not Covered:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700 font-sohne">
                    Temperament or behavioral issues that develop due to lack of
                    proper training or socialization
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700 font-sohne">
                    Minor variations in size, weight, color, or markings from
                    what was expected
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700 font-sohne">
                    Injuries or conditions resulting from accidents, neglect, or
                    improper care
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700 font-sohne">
                    Parasitic conditions (internal or external) that develop
                    after the puppy leaves our care
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700 font-sohne">
                    Costs associated with spaying or neutering, including
                    undescended testicles
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed text-lg font-sohne">
              This guarantee becomes void if the dog has not received proper
              veterinary care, appropriate nutrition, or has been bred without
              our prior knowledge and consent. Additionally, any physical injury
              or illness resulting from strenuous exercise, jumping from
              heights, or any other activity is not covered under this
              guarantee.
            </p>
          </section>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4 font-playfair">
              Have Questions About Our Health Guarantee?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-lg font-sohne">
              We're committed to transparency and want you to feel confident in
              your decision to welcome one of our puppies into your home. If you
              have any questions about our health guarantee, please don't
              hesitate to contact us.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg font-sohne"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default GuaranteePage;
