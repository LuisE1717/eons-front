import React from 'react'
import Span from '../Span/Span';
import useTranslation from '../../../../Shared/hooks/useTranslation';

export default function Free ({
  name,
  onclick,
}: {
  name: string;
  onclick?: () => void;
}) {
    const { translation } = useTranslation();
  return (
    <div 
      onClick={onclick}
      className="
      w-full sm:text-[1rem]
      text-sm sm:mb-5 mb-3.5 md:px-6 !leading-8 
      hover:text-primary cursor-pointer items-center">
      <span className="">{name}.</span>
      <div>
      (<Span color="secundary">{translation.ServiceMenu.free}</Span>)
      </div>
    </div>
  )
}
