import SmallLogo from 'assets/icons/ico-small-logo.svg';
import HeadRight from 'assets/icons/ico-head-right.svg';

interface NavigationProps {
  scrollToReservation: () => void;
}

function NavigationBar({ scrollToReservation }: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center w-full z-50">
      <div className="max-w-[1200px] w-full flex justify-between items-center bg-white text-[20px] rounded-[20px] shadow-suldak-card py-4 px-6">
        <div className="flex items-center">
          <SmallLogo className="mr-[20px]" />
          <div>즐거운 술 문화를 위한 플랫폼</div>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-suldak-mint-500 rounded-[30px] text-white text-[16px] px-[20px] py-[10px] flex items-center"
            onClick={scrollToReservation}
          >
            사전예약
            <HeadRight className="ml-2" fill="white" />
          </button>
          <button className="bg-suldak-mint-500 rounded-[30px] text-[16px] text-white px-[20px] py-[10px] flex items-center">
            블로그 보기
            <HeadRight className="ml-2" fill="white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;