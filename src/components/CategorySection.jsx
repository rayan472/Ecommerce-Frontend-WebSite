import React from 'react'
import ManCatergory from '../assets/Images/ManCategory.png'
import WomenCategory from '../assets/Images/WomanCategory.png'
import KidCategory from '../assets/Images/KidCategory.png'


function CategorySection() {

  const categories = [
    {
      title: 'Man',
      imageUrl: ManCatergory
    },
    {
      title: 'Women',
      imageUrl: WomenCategory
    },
    {
      title: 'Kids',
      imageUrl: KidCategory
    },
  ]

  return (
    <div className='container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6'>
      {categories.map((category, index) => (
        <div key={index} className='relative h-64 transform transition-transform duration-300 hover:scale-105 cursor-pointer pb-5'>
          <img src={category.imageUrl} alt="Man Image" className='w-full h-full object-cover rounded-lg shadow-md'/>
          <div className='absolute top-20 left-12'>
            <p className='text-xl font-bold'>{category.title}</p>
            <p className='text-gray-600'>View All</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategorySection