"use client";
import Image from "next/image";
import ReservationImg from "assets/pngs/bg-reservation.png";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useEnrollReservation } from "apis/landing/useEnrollReservation";

const ReservationSection = React.forwardRef<HTMLDivElement, {}>(
  (_props, ref) => {
    const [email, setEmail] = useState("");
    const enrollMutation = useEnrollReservation();

    const handleSubscribe = () => {
      if (email.trim()) {
        enrollMutation.mutate(email, {
          onSuccess: (data) => {
            if (process.env.NODE_ENV === "development") {
              console.log("Enrollment response:", data);
            }
            toast.success("성공적으로 등록되었습니다!");
            setEmail(""); // 성공 시 입력 필드 초기화
          },
          onError: (error) => {
            toast.error(" 오류: 다시 시도해주세요.");
          },
        });
      }
    };

    return (
      <div className="relative h-[684px] w-full mobile:h-[390px]" ref={ref}>
        <Image
          src={ReservationImg}
          alt={"사전예약"}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 z-10 flex w-full flex-col items-center justify-center text-white">
          <div className="text-[80px] font-bold mobile:text-[36px]">
            술닥술닥 사전예약
          </div>
          <div className="mb-[40px] text-center text-[30px] mobile:text-[16px]">
            메일주소를 입력하시면 술닥술닥의 <br className="pc:hidden" />
            오픈 소식을 알려드릴게요!
          </div>
          <div className="flex items-center text-[25px] mobile:flex-col mobile:justify-center mobile:space-y-[8px] mobile:text-[16px]">
            <input
              className="h-[68px] w-[809px] rounded-[10px] bg-white/50 px-4 text-black mobile:h-[48px] mobile:w-[330px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <button
              className="ml-[20px] h-[68px] w-[233px] rounded-[10px] bg-white text-[25px] font-bold text-suldak-mint-500 mobile:hidden"
              onClick={handleSubscribe}
              disabled={enrollMutation.isPending || !email.trim()}
            >
              {enrollMutation.isPending ? "처리 중..." : "Subscribe"}
            </button>
            <button
              className="h-[68px] w-[233px] rounded-[10px] bg-white text-[25px] font-bold text-suldak-mint-500 mobile:h-[48px] mobile:w-[330px] mobile:text-[16px] pc:hidden"
              onClick={handleSubscribe}
              disabled={enrollMutation.isPending || !email.trim()}
            >
              {enrollMutation.isPending ? "처리 중..." : "제출하기"}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

ReservationSection.displayName = "ReservationSection";

export default ReservationSection;
