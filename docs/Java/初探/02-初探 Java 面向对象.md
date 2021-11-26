**初探 Java 系列第二篇**，本文的目的仅在于对 Java 面向对象部分知识点查漏补缺以及深入理解，而并非带你从零开始学习 Java，所以需要对 Java 已经有简单的了解。

在阅读本文之前，推荐先阅读[初探计算机基础](/ComputerBasic/导航)系列、初探 Java 系列的第一篇。

## **面向对象程序设计的基本概念**

面向对象程序设计（简称 OOP）是当今主流的程序设计范型，其基本思想是使用对象、类、继承、封装、多态等基本概念来进行程序设计。从现实世界中客观存在的事物（即对象）出发来构造软件系统，并且在系统构造中尽可能运用人类的自然思维方式。它已经取代了 20 世纪 70 年代的“结构化”过程化程序设计开发技术。Java 是完全面向对象的，必须熟悉 OOP 才能够编写 Java 程序。

### 对象是描述客观事物的实体

对象是系统用来描述客观事物的一个实体，它是构成系统的一个基本单位。一个对象由一组属性和对这组属性进行操作的一组服务组成。

要想使用 OOP，一定要清楚对象的三个主要特性。

- 对象的**行为**：可以对对象施加哪些操作，或者可以对对象施加哪些方法？
- 对象的**状态**：当施加那些方法时，对象应该如何响应？
- 对象的**标识**：如何辨别具有相同行为与状态的不同对象？

### 类是构造对象的模板或蓝图

类（class）是构造对象的模板或蓝图，是具有**相同属性和方法**的一组对象的集合。类为属于该类的所有对象提供了统一的抽象描述，其内部包括属性和方法两个主要部分。在面向对象的编程语言中，类是一个独立的程序单位，它应该有一个类名并包括属性和方法两个主要部分。由类构造对象的过程称为创建类的实例。

### 类与类之间常见的三种关系

在类和类之间，最常见的三种关系是：依赖（uses-a）、聚合（has-a）、继承（is-a）。

依赖关系（dependence），即 uses-a 关系，是一种最明显的，最常见的关系。所谓的依赖即是一个类的方法操纵了另一个类的对象。依照软件工程的要求，应该尽可能地将相互依赖的类减至最少，即所谓的让类之间的耦合度最小。

聚合关系（aggregation），即 has-a 关系，是一种具体且易于理解的关系，即一个类的对象包含着一些其它类的对象。

继承关系（inheritance）。即 is-a 关系，是一种用于表示特殊与一般的关系，一个类 A 继承了一个类 B，即类 A 不但包含从 B 继承的方法，还会拥有一些额外的功能。

### 面向对象的三大特性：封装、继承、多态

**封装**是利用抽象数据类型将数据和基于数据的操作封装在一起，使其构成一个不可分割的独立实体。数据被保护在抽象数据类型的内部，尽可能地隐藏内部的细节，只保留一些对外接口使之与外部发生联系。用户无需知道对象内部的细节，但可以通过对象对外提供的接口来访问该对象。

**继承**实现了 is-a 关系。有两个对象 A 和 B，若可以描述为 A is a B，则可以表示 A 继承 B，其中 B 是被继承者，称之为父类或者超类，A 是继承者，称之为子类或者派生类。继承是使用已存在的类的定义作为基础建立新类的技术，新类的定义可以增加新的数据或新的功能，也可以用父类的功能，但不能选择性地继承父类。通过使用继承我们能够非常方便地复用以前的代码，能够大大的提高开发的效率。继承应该遵循里氏替换原则，子类对象必须能够替换掉所有父类对象，也就是**向上转型**。

:::tip **里氏替换原则**
里氏替换原则，在[初探设计模式](/ComputerBasic/初探/初探设计模式)中有详细介绍，**向上转型**是一个极其重要的概念，在之后的泛型、集合等部分会经常用到，如果掌握的不好，后面会理解的十分困难。

举一个最常用的例子`List<Integer> list = new ArrayList<>();`，ArrayList 是 List 接口的一个实现类，然而却可以直接实例化一个 ArrayList 赋值给 List 对象。
:::

**多态**是指程序中定义的引用变量所指向的具体类型和通过该引用变量发出的方法调用在编程时并不确定，而是在程序运行期间才确定，即**一个引用变量倒底会指向哪个类的实例对象，该引用变量发出的方法调用到底是哪个类中实现的方法，必须在由程序运行期间才能决定**。因为在程序运行时才确定具体的类，这样不用修改源程序代码，就可以让引用变量绑定到各种不同的类实现上，从而导致该引用调用的具体方法随之改变。

:::info
对于面向对象而言，多态分为**编译时多态**和**运行时多态**。其中编译时多态是静态的，主要是指方法的重载，它是根据参数列表的不同来区分不同的函数，通过编辑之后会变成两个不同的函数，在运行时谈不上多态。而运行时多态是动态的，它是通过动态绑定来实现的，也就是我们所说的多态性。向上转型就是典型的多态。
:::

## **Java 中的面向对象**

面向对象的概念其实很多时候过于的抽象，以至于难以理解，所以现在具体到语言层面，看看面向对象在 Java 中是怎么体现的。

### 封装在 Java 中借助访问权限关键字实现

封装在 Java 中是借助访问权限关键字实现的，即关键字 **private、default、protected、public**。

|            | private | default | protected | public |
| ---------- | ------- | ------- | --------- | ------ |
| 同一个类中 | √       | √       | √         | √      |
| 同一个包中 |         | √       | √         | √      |
| 子类       |         |         | √         | √      |
| 全局       |         |         |           | √      |

简单地总结成一句话：封装在 Java 中就是将类中的属性设置为 private，然后提供 public 的 set()、get() 方法。访问权限外设置值只能通过 set() 方法，获取值只能通过 get() 方法，示例如下。

```java
public class Demo {
    private Integer number;

    public void setNumber(Integer integer) {
        this.number = integer;
    }
    public Integer getNumber() {
        return this.number;
    }
}
```

:::info
注意是**简单地总结**，事实上大部分人都是这么理解的，然而上面这个说法只是简单易懂而已，但是却并不能说是完全的正确，下面马上讨论哪里会有问题。
:::

### 方法返回引用可变对象可能会破坏封装性

先看一段代码，就会发现一个有趣的结果。

```java
public class Employee {

    private String name;
	private double salary;
    private Date hireDay;

    public Employee() {
        this.name = "Jack";
        this.salary = 1.0;
        this.hireDay = new Date()
    }
    public Date getHireDay() {
        return hireDay;
    }

    public static void main(String[] args) {
        Employee harry = new Employee(0L);
        Date d = harry.getHireDay();
        System.out.println(d);
        d.setTime(d.getTime() + 100000000L);
        System.out.println(d);
        d = harry.getHireDay();
        System.out.println(d);
    }
}
```

<img src={require('./Image/初探Java面向对象/私有属性的封装性被破坏.png').default} width="500px" />

这段代码的结果很有意思，会发现借助 private 关键字实现的封装性被破坏了。这里出错的原因很微妙，d 和 harry.hireDay 引用了同一个对象，对于 d 调用更改器方法就可以自动地改变这个 harry 对象的私有状态。

<img src={require('./Image/初探Java面向对象/返回可变数据域的引用.png').default} width="500px" />

这里可能会被绕晕，但是要注意，针对于私有属性 hireDay 来说，希望外部能获取它值的唯一方式（暂时不去考虑反射）是通过 getHireDay() 方法，希望外部能修改它值的唯一方式（暂时不去考虑反射）是通过 setHireDay() 方法，**当然方法名字你也可以改成别的，关键之处在于 set 与 get 方法必须是针对于该属性的**。而例子中的 setTime() 方法很明显是 Date 类中的方法，也就是说其实是修改了底层的 Date 来致使 hireDay 也被修改了。

:::info
其实一般写代码不会讲究这一点，但是讲不讲究是一回事，清不清楚又是另一回事了。
:::

### 返回可变对象的引用应该先对它进行克隆

如果需要返回一个可变对象的引用，应该首先对它进行克隆（clone）。对象 clone 是指存放在另一个位置上的对象副本。

:::info
在[初探 Java 基础](/Java/初探/初探%20Java%20基础)中有涉及过 Object 类，在 Object 中存在一个 clone() 方法，这个方法会返回一个可变数据域的拷贝。
:::

```java
public class Employee {

    private String name;
	private double salary;
    private Date hireDay;

    public Employee() {
        this.name = "Jack";
        this.salary = 1.0;
        this.hireDay = new Date()
    }
    public Date getHireDay() {
        return (Date) hireDay.clone();
    }

    public static void main(String[] args) {
        Employee harry = new Employee(0L);
        Date d = harry.getHireDay();
        System.out.println(d);
        d.setTime(d.getTime() + 100000000L);
        System.out.println(d);
        d = harry.getHireDay();
        System.out.println(d);
    }
}
```

<img src={require('./Image/初探Java面向对象/使用clone返回对象的备份.png').default} width="500px" />

当使用了 clone 返回一个拷贝的副本以后，可以看到对于副本的修改不会印象原来的对象。

### 继承在 Java 中借助 extends、super 关键字实现
